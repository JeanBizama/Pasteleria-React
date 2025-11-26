import React, { useState, useEffect } from 'react';
import '../styles/style.css';
import '../styles/style_admin.css';
import Header from '../components/Header';
import { useAuth} from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPage(){
    const { user, users, deleteUser, updateUserByIndex, addUser, listUsers, logout } = useAuth(); 
    const navigate = useNavigate();
    
    const { products, removeProduct, updateProduct, addProduct } = useProducts(); 
    
    const [editingUser, setEditingUser] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null); 
    const [userForm, setUserForm] = useState({});
    
    const [productForm, setProductForm] = useState({}); 
    const [addingUser, setAddingUser] = useState(false);
    const [addingProduct, setAddingProduct] = useState(false);
    const [newUser, setNewUser] = useState({ email:'', username:'', password:'', fechaNacimiento:'', cupon:'', rol:'' });
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [newProduct, setNewProduct] = useState({ 
        nombre:'', 
        descripcion:'', 
        precio: '', 
        imagenUrl:'', 
        categoria: '' 
    });

    useEffect(() => {
        if (!user || user?.rol?.toLowerCase() !== 'admin') {
        return; 
        }


    if (!usersLoaded) {
            const loadUsers = async () => {
                try {
                    await listUsers(); 
                    setUsersLoaded(true); 
                } catch (error) {
                    console.error("Fallo al cargar usuarios:", error);
                    // Si el backend rechaza, forzar el deslogeo
                    if (error.message.includes('Acceso denegado')) {
                        logout(); 
                    }
                }
            };
            loadUsers();
        }
    }, [user, listUsers, usersLoaded, logout]);


  function startEditUser(i){
    setEditingUser(i);
    setUserForm({...users[i]});
  }
  function cancelEditUser(){ setEditingUser(null); setUserForm({}); }
  function saveUser(i){ updateUserByIndex(i, {...users[i], ...userForm}); setEditingUser(null); }

async function handleAddUser(){ // 🛑 ES ASÍNCRONA
    try {
        const userToSave = {
            email: newUser.email,
            contrasena: newUser.password, 
            nombre: newUser.username, 
            fechaNacimiento: newUser.fechaNacimiento,
            cupon: newUser.cupon,
            rol: newUser.rol || 'CLIENTE'
        };
        
        console.log("Enviando usuario:", userToSave);

        await addUser(userToSave); 

        setAddingUser(false); 
        setNewUser({ email:'', username:'', password:'', fechaNacimiento:'', cupon:'', rol:'' });
        
        alert("Usuario agregado con éxito!");

    } catch (err) {
        // Manejar errores de la API (ej: email duplicado, credenciales inválidas, etc.)
        alert("Error al agregar usuario: " + (err.message || 'Error desconocido.'));
    }
}

  async function handleDeleteUser(userId){
        if(window.confirm('¿Eliminar usuario? Esta acción es permanente.')) {
            try {
                await deleteUser(userId); 
            } catch (err) {
                alert("Error al eliminar usuario: " + err.message);
            }
        }
    }

  function handleDeleteProduct(productId) {
        if(window.confirm('Eliminar producto?')) {
            removeProduct(productId);
        }
    }

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

    if (!user) {
    navigate('/login');
    return <div style={{padding: '50px', textAlign: 'center'}}>Redirigiendo a Login...</div>;
    }

    if (user.rol?.toLowerCase() !== 'admin') {
        navigate('/');
        return <div style={{padding: '50px', textAlign: 'center'}}>Acceso denegado. Redirigiendo a Inicio...</div>;
    }

 return (
        <div>
            <Header />
            <main>
                <div className="admin-main-content">
                    <h1>Administración</h1>
                    {/* Sección Usuarios (Sin cambios) */}
                    <hr/>
                    <section>
                        <h2>Gestión de Usuarios ({users.length})</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Mapeamos la lista de usuarios */}
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        
                                        {/* Nombre (campo editable) */}
                                        <td>
                                            {editingUser === u.id ? (
                                                <input 
                                                    value={userForm.nombre || ''} 
                                                    onChange={e => setUserForm({ ...userForm, nombre: e.target.value })} 
                                                />
                                            ) : u.nombre}
                                        </td>
                                        
                                        {/* Correo electrónico */}
                                        <td>{u.email}</td>
                                        
                                        {/* Rol */}
                                        <td>{u.rol}</td>
                                        
                                        {/* Acciones (Editar/Eliminar) */}
                                        <td>
                                            {editingUser === u.id ? (
                                                <>
                                                    <button onClick={saveUser}>Guardar</button>
                                                    <button onClick={cancelEditUser}>Cancelar</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEditUser(u)}>Editar</button>
                                                    <button onClick={() => handleDeleteUser(u.id)}>Eliminar</button> 
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <button id="btnAgregarUsuario" style={{marginTop:8}} onClick={()=>setAddingUser(true)}>Agregar Usuario</button>
                        
                        {/* 🚀 Formulario de Agregar Usuario */}
                        {addingUser && (
                            <div style={{marginTop:12}}>
                                {/* 💡 Usamos 'username' para el input, pero mapeamos a 'nombre' al guardar */}
                                <input placeholder="Nombre" value={newUser.username} onChange={e=>setNewUser({...newUser,username:e.target.value})} />
                                <input placeholder="Correo" value={newUser.email} onChange={e=>setNewUser({...newUser,email:e.target.value})} />
                                <input placeholder="Contraseña" type="password" value={newUser.password} onChange={e=>setNewUser({...newUser,password:e.target.value})} />
                                <input placeholder="Fecha Nacimiento (AAAA-MM-DD)" value={newUser.fechaNacimiento} onChange={e=>setNewUser({...newUser,fechaNacimiento:e.target.value})} />
                                <input placeholder="Cupón" value={newUser.cupon} onChange={e=>setNewUser({...newUser,cupon:e.target.value})} />
                                <input placeholder="Rol" value={newUser.rol} onChange={e=>setNewUser({...newUser,rol:e.target.value})} />
                                <button onClick={handleAddUser}>Guardar Usuario</button>
                                <button onClick={()=>setAddingUser(false)}>Cancelar</button>
                            </div>
                        )}
                    </section>
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
