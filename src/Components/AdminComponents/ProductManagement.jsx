import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import { getProducts } from '../../Services/Poducts/getProducts';
import { postProduct } from '../../Services/Poducts/postProducts';
import { putProduct } from '../../Services/Poducts/putProducts';
import { deleteProduct } from '../../Services/Poducts/deleteProducts';
import '../../Styles/ProductManagement.css';
import AdminSidebar from '../AdminComponents/SidebarAdmin';
import CustomModal from '../CustomModals'; // Importamos el modal personalizado

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [modalInfo, setModalInfo] = useState({}); // Información que se mostrará en el modal

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      setModalInfo({
        title: 'Error',
        message: 'Error al obtener los productos.',
        onConfirm: () => setShowModal(false)
      });
      setShowModal(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await putProduct(editingProductId, formData);
        setModalInfo({
          title: 'Éxito',
          message: 'Producto actualizado exitosamente.',
          onConfirm: () => {
            setShowModal(false);
            fetchProducts();
          }
        });
        setEditingProductId(null);
      } else {
        await postProduct(formData);
        setModalInfo({
          title: 'Éxito',
          message: 'Producto agregado exitosamente.',
          onConfirm: () => {
            setShowModal(false);
            fetchProducts();
          }
        });
      }
      setShowModal(true);
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        imageUrl: ''
      });
    } catch (error) {
      setModalInfo({
        title: 'Error',
        message: 'Hubo un error al guardar el producto.',
        onConfirm: () => setShowModal(false)
      });
      setShowModal(true);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingProductId(product.id);
  };

  const handleDelete = async (productId) => {
    setModalInfo({
      title: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      onConfirm: async () => {
        try {
          await deleteProduct(productId);
          setModalInfo({
            title: 'Éxito',
            message: 'Producto eliminado exitosamente.',
            onConfirm: () => {
              setShowModal(false);
              fetchProducts();
            }
          });
          setShowModal(true);
        } catch (error) {
          setModalInfo({
            title: 'Error',
            message: 'Hubo un error al eliminar el producto.',
            onConfirm: () => setShowModal(false)
          });
          setShowModal(true);
        }
      },
      onClose: () => setShowModal(false)
    });
    setShowModal(true);
  };

  return (
    <div className="product-management-container">
      <AdminSidebar />
      <div className="ProductList">
        <h2>Productos Disponibles</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div>
                <h3>{product.name} - ${product.price}</h3>
                <p>{product.description}</p>
                <p>Categoría: {product.category}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(product)}><FaEdit /></button>
                <button onClick={() => handleDelete(product.id)}><FaTrashAlt /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-form-container">
        <h2>{editingProductId ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre del Producto</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="">Seleccionar Categoría</option>
              <option value="suplementos">Suplementos</option>
              <option value="insumos">Insumos de Cultivo</option>
              <option value="laboratorio">Laboratorio</option>
              <option value="geneticas">Genéticas</option>
              <option value="kits">Kits de Cultivo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Imagen</label>
            <input type="file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleImageUpload} />
          </div>
          <button type="submit">{editingProductId ? 'Actualizar Producto' : 'Guardar Producto'}</button>
        </form>
      </div>

      {/* Modal personalizado para alertas */}
      <CustomModal 
        show={showModal} 
        title={modalInfo.title} 
        message={modalInfo.message} 
        onConfirm={modalInfo.onConfirm} 
        onClose={modalInfo.onClose} 
      />
    </div>
  );
};

export default ProductManagement;
