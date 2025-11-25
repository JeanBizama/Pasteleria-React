import React, { useState } from 'react';
import '../styles/style.css';
import '../styles/style_admin.css';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';

export default function AdminPage(){
    const { users, deleteUserByIndex, updateUserByIndex, addUser } = useAuth();
    
    const { products, removeProduct, updateProduct, addProduct } = useProducts(); 
    
    const [editingUser, setEditingUser] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null); 
    const [userForm, setUserForm] = useState({});
    
    const [productForm, setProductForm] = useState({}); 
    const [addingUser, setAddingUser] = useState(false);
    const [addingProduct, setAddingProduct] = useState(false);
    const [newUser, setNewUser] = useState({ email:'', username:'', password:'', fechaNacimiento:'', cupon:'', rol:'cliente' });

    const [newProduct, setNewProduct] = useState({ 
        nombre:'', 
        descripcion:'', 
        precio: '', 
        imagenUrl:'', 
        categoria: '' 
    });

  function startEditUser(i){
    setEditingUser(i);
    setUserForm({...users[i]});
  }
  function cancelEditUser(){ setEditingUser(null); setUserForm({}); }
  function saveUser(i){ updateUserByIndex(i, {...users[i], ...userForm}); setEditingUser(null); }

  function startEditProduct(product) { 
        setEditingProductId(product.id);
        // Mapeamos los nombres de la API a un formulario temporal con los nombres de la API
        setProductForm({
            id: product.id,
            nombre: product.nombre || '',
            descripcion: product.descripcion || '',
            precio: product.precio || '',
            imagenUrl: product.imagenUrl || '',
            categoriaNombre: (product.categoria && product.categoria.nombre) || '' 
        });
  }
  function cancelEditProduct(){ setEditingProductId(null); setProductForm({}); }

  function saveProduct() { 
        const productId = productForm.id;
        if (!productId) return; 

        const updatedData = {
            nombre: productForm.nombre,
            descripcion: productForm.descripcion,
            precio: Number(productForm.precio),
            imagenUrl: productForm.imagenUrl,
            nombreCategoria: productForm.categoriaNombre
        };
        
        updateProduct(productId, updatedData); 
        setEditingProductId(null);
    }

  function handleDeleteProduct(productId) {
        if(window.confirm('Eliminar producto?')) {
            removeProduct(productId);
        }
  }

  function handleAddProduct() {
        const newProd = {
            ...newProduct,
            precio: Number(newProduct.precio),
            categoria: { nombre: newProduct.categoria } 
        };
        addProduct(newProd);
        setAddingProduct(false); 
        setNewProduct({ nombre:'', descripcion:'', precio: '', imagenUrl:'', categoria: '' });
    }

 return (
        <div>
            <Header />
            <main>
                <div className="admin-main-content">
                    <h1>Administración</h1>
                    {/* Sección Usuarios (Sin cambios) */}
                    <section>
                        <h2>Usuarios</h2>
                        {/* ... tabla de usuarios (Sin cambios en este ejemplo) ... */}
                        <button id="btnAgregarUsuario" style={{marginTop:8}} onClick={()=>setAddingUser(true)}>Agregar Usuario</button>
                    </section>

                    <hr/>
                    
                    <section>
                        <h2>Productos</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre del Producto</th>
                                    <th>Descripcion</th>
                                    <th>Precio</th>
                                    <th>Imagen</th>
                                    <th>Categoría</th> {/* Cambiado de 'Categorias' a 'Categoría' */}
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 🚀 Mapeo de la lista de productos */}
                                {products.map((p) => (
                                    // Usamos p.id como key
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        
                                        {/* Nombre del Producto */}
                                        <td>
                                            {editingProductId === p.id ? (
                                                <input 
                                                    value={productForm.nombre||''} 
                                                    onChange={e=>setProductForm({...productForm, nombre:e.target.value})} 
                                                />
                                            ) : p.nombre}
                                        </td>
                                        
                                        {/* Descripción */}
                                        <td>
                                            {editingProductId === p.id ? (
                                                <input 
                                                    value={productForm.descripcion||''} 
                                                    onChange={e=>setProductForm({...productForm, descripcion:e.target.value})} 
                                                />
                                            ) : p.descripcion}
                                        </td>
                                        
                                        {/* Precio */}
                                        <td>
                                            {editingProductId === p.id ? (
                                                <input 
                                                    type="number" 
                                                    value={productForm.precio||''} 
                                                    onChange={e=>setProductForm({...productForm, precio:e.target.value})} 
                                                />
                                            ) : p.precio}
                                        </td>
                                        
                                        {/* Imagen URL */}
                                        <td>
                                            {editingProductId === p.id ? (
                                                <input 
                                                    value={productForm.imagenUrl||''} 
                                                    onChange={e=>setProductForm({...productForm, imagenUrl:e.target.value})} 
                                                />
                                            ) : (<span style={{display:'block', maxWidth:300, overflow:'hidden', textOverflow:'ellipsis'}}>{p.imagenUrl}</span>)}
                                        </td>
                                        
                                        {/* Categoría (Campo anidado) */}
                                        <td>
                                            {editingProductId === p.id ? (
                                                <input 
                                                    value={productForm.categoriaNombre||''} 
                                                    onChange={e=>setProductForm({...productForm, categoriaNombre:e.target.value})} 
                                                />
                                            ) : (p.categoria && p.categoria.nombre)}
                                        </td>
                                        
                                        {/* Acciones */}
                                        <td>
                                            {editingProductId === p.id ? (
                                                <>
                                                    <button onClick={saveProduct}>Guardar</button>
                                                    <button onClick={cancelEditProduct}>Cancelar</button>
                                                </>
                                            ) : (
                                                <>
                                                    {/* Usamos el objeto 'p' para pasar el producto completo a startEditProduct */}
                                                    <button onClick={()=>startEditProduct(p)}>Editar</button> 
                                                    <button onClick={()=>handleDeleteProduct(p.id)}>Eliminar</button> {/* Usamos el ID */}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <button id="btnAgregarProducto" style={{marginTop:8}} onClick={()=>setAddingProduct(true)}>Agregar Producto</button>
                        
                        {/* 🚀 Formulario de Agregar Producto */}
                        {addingProduct && (
                            <div style={{marginTop:12}}>
                                <input placeholder="Nombre" value={newProduct.nombre} onChange={e=>setNewProduct({...newProduct,nombre:e.target.value})} />
                                <input placeholder="Descripción" value={newProduct.descripcion} onChange={e=>setNewProduct({...newProduct,descripcion:e.target.value})} />
                                <input placeholder="Precio" type="number" value={newProduct.precio} onChange={e=>setNewProduct({...newProduct,precio:e.target.value})} />
                                <input placeholder="URL de Imagen" value={newProduct.imagenUrl} onChange={e=>setNewProduct({...newProduct,imagenUrl:e.target.value})} />
                                <input placeholder="Nombre de Categoría (ej: tortas-cuadradas)" value={newProduct.categoria} onChange={e=>setNewProduct({...newProduct,categoria:e.target.value})} />
                                
                                <button onClick={handleAddProduct}>Guardar Producto</button>
                                <button onClick={()=>setAddingProduct(false)}>Cancelar</button>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
