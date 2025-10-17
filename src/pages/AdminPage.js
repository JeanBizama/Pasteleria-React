import React, { useState } from 'react';
import '../styles/style.css';
import '../styles/style_admin.css';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';

export default function AdminPage(){
  const { users, deleteUserByIndex, updateUserByIndex } = useAuth();
  const { products, removeProduct, updateProduct } = useProducts();
  const { addProduct } = useProducts();
  const { addUser } = useAuth();

  const [editingUser, setEditingUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [userForm, setUserForm] = useState({});
  const [productForm, setProductForm] = useState({});
  const [addingUser, setAddingUser] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);
  const [newUser, setNewUser] = useState({ email:'', username:'', password:'', fechaNacimiento:'', cupon:'', rol:'cliente' });
  const [newProduct, setNewProduct] = useState({ id:'', name:'', description:'', price:'', image:'', categories:'' });

  function startEditUser(i){
    setEditingUser(i);
    setUserForm({...users[i]});
  }

  function cancelEditUser(){ setEditingUser(null); setUserForm({}); }

  function saveUser(i){ updateUserByIndex(i, {...users[i], ...userForm}); setEditingUser(null); }

  function startEditProduct(i){ setEditingProduct(i); setProductForm({...products[i]}); }
  function cancelEditProduct(){ setEditingProduct(null); setProductForm({}); }
  function saveProduct(i){ updateProduct(i, {...products[i], ...productForm}); setEditingProduct(null); }

  return (
    <div>
      <Header />
      <main>
        <div className="admin-main-content">
          <h1>Administración</h1>
          <section>
            <h2>Usuarios</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nombre de usuario</th>
                  <th>Contraseña</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Cupon</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {addingUser && (
                  <tr>
                    <td><input value={newUser.email} onChange={e=>setNewUser({...newUser,email:e.target.value})} /></td>
                    <td><input value={newUser.username} onChange={e=>setNewUser({...newUser,username:e.target.value})} /></td>
                    <td><input value={newUser.password} onChange={e=>setNewUser({...newUser,password:e.target.value})} /></td>
                    <td><input type="date" value={newUser.fechaNacimiento} onChange={e=>setNewUser({...newUser,fechaNacimiento:e.target.value})} /></td>
                    <td><input value={newUser.cupon} onChange={e=>setNewUser({...newUser,cupon:e.target.value})} /></td>
                    <td><input value={newUser.rol} onChange={e=>setNewUser({...newUser,rol:e.target.value})} /></td>
                    <td>
                      <button onClick={()=>{ addUser(newUser); setAddingUser(false); setNewUser({ email:'', username:'', password:'', fechaNacimiento:'', cupon:'', rol:'cliente' }); }}>Guardar</button>
                      <button onClick={()=>setAddingUser(false)}>Cancelar</button>
                    </td>
                  </tr>
                )}
                {users.map((u,i)=> (
                  <tr key={i}>
                    <td>
                      {editingUser === i ? (
                        <input value={userForm.email||''} onChange={e=>setUserForm({...userForm, email:e.target.value})} />
                      ) : u.email}
                    </td>
                    <td>
                      {editingUser === i ? (
                        <input value={userForm.username||''} onChange={e=>setUserForm({...userForm, username:e.target.value})} />
                      ) : u.username}
                    </td>
                    <td>
                      {editingUser === i ? (
                        <input value={userForm.password||''} onChange={e=>setUserForm({...userForm, password:e.target.value})} />
                      ) : u.password}
                    </td>
                    <td>
                      {editingUser === i ? (
                        <input type="date" value={userForm.fechaNacimiento||''} onChange={e=>setUserForm({...userForm, fechaNacimiento:e.target.value})} />
                      ) : u.fechaNacimiento}
                    </td>
                    <td>
                      {editingUser === i ? (
                        <input value={userForm.cupon||''} onChange={e=>setUserForm({...userForm, cupon:e.target.value})} />
                      ) : u.cupon}
                    </td>
                    <td>
                      {editingUser === i ? (
                        <input value={userForm.rol||''} onChange={e=>setUserForm({...userForm, rol:e.target.value})} />
                      ) : u.rol}
                    </td>
                    <td>
                      {editingUser === i ? (
                        <>
                          <button onClick={()=>saveUser(i)}>Guardar</button>
                          <button onClick={cancelEditUser}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={()=>startEditUser(i)}>Editar</button>
                          {/* eslint-disable-next-line no-alert */}
                          <button onClick={()=>{ if(window.confirm('Eliminar usuario?')) deleteUserByIndex(i); }}>Eliminar</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button id="btnAgregarUsuario" style={{marginTop:8}} onClick={()=>setAddingUser(true)}>Agregar Usuario</button>
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
                  <th>Categorias</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p,i)=> (
                  <tr key={p.id || i}>
                    <td>{p.id}</td>
                    <td>
                      {editingProduct === i ? (
                        <input value={productForm.name||''} onChange={e=>setProductForm({...productForm, name:e.target.value})} />
                      ) : p.name}
                    </td>
                    <td>
                      {editingProduct === i ? (
                        <input value={productForm.description||''} onChange={e=>setProductForm({...productForm, description:e.target.value})} />
                      ) : p.description}
                    </td>
                    <td>
                      {editingProduct === i ? (
                        <input value={productForm.price||''} onChange={e=>setProductForm({...productForm, price:e.target.value})} />
                      ) : p.price}
                    </td>
                    <td>
                      {editingProduct === i ? (
                        <input value={productForm.image||''} onChange={e=>setProductForm({...productForm, image:e.target.value})} />
                      ) : (<span style={{display:'block', maxWidth:300, overflow:'hidden', textOverflow:'ellipsis'}}>{p.image}</span>)}
                    </td>
                    <td>{(p.categories||[]).join(', ')}</td>
                    <td>
                      {editingProduct === i ? (
                        <>
                          <button onClick={()=>saveProduct(i)}>Guardar</button>
                          <button onClick={cancelEditProduct}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={()=>startEditProduct(i)}>Editar</button>
                          {/* eslint-disable-next-line no-alert */}
                          <button onClick={()=>{ if(window.confirm('Eliminar producto?')) removeProduct(i); }}>Eliminar</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button id="btnAgregarProducto" style={{marginTop:8}} onClick={()=>setAddingProduct(true)}>Agregar Producto</button>
            {addingProduct && (
              <div style={{marginTop:12}}>
                <input placeholder="id" value={newProduct.id} onChange={e=>setNewProduct({...newProduct,id:e.target.value})} />
                <input placeholder="name" value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} />
                <input placeholder="description" value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})} />
                <input placeholder="price" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:Number(e.target.value)})} />
                <input placeholder="image url" value={newProduct.image} onChange={e=>setNewProduct({...newProduct,image:e.target.value})} />
                <input placeholder="categories csv" value={newProduct.categories} onChange={e=>setNewProduct({...newProduct,categories:e.target.value})} />
                <button onClick={()=>{ addProduct({...newProduct, categories: (newProduct.categories||'').split(',').map(s=>s.trim()) }); setAddingProduct(false); setNewProduct({ id:'', name:'', description:'', price:'', image:'', categories:'' }); }}>Guardar Producto</button>
                <button onClick={()=>setAddingProduct(false)}>Cancelar</button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
