import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

function calcularBeneficio(email, fechaNacimiento, cupon) {
  let beneficio = 'No tienes ningún beneficio activo!';
  let descuento = 0;
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  let mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;

  if (edad >= 50) { descuento = 50; beneficio = 'Descuento del 50% por ser mayor de 50 años.'; }
  if (cupon && cupon.trim().toUpperCase() === 'FELICES50' && descuento === 0) { descuento = 10; beneficio = 'Descuento del 10% de por vida con el cupón FELICES50.'; }

  if (email && (email.includes('@duocuc.cl') || email.includes('@profesor.duocuc.cl'))) {
    const mesNacimiento = nacimiento.getMonth();
    const diaNacimiento = nacimiento.getDate();
    if (hoy.getMonth() === mesNacimiento && hoy.getDate() === diaNacimiento) beneficio = 'Torta gratis por cumpleaños (Por ser parte de Duoc).';
    else beneficio = 'Eres parte de Duoc, espera tu cumpleaños para una torta gratis.';
  }

  return { beneficio, descuento };
}

export function AuthProvider({ children }){
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('usuarios')) || []);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('usuarioLogueado')) || null);

  useEffect(() => { localStorage.setItem('usuarios', JSON.stringify(users)); }, [users]);
  useEffect(() => { if (user) localStorage.setItem('usuarioLogueado', JSON.stringify(user)); else localStorage.removeItem('usuarioLogueado'); }, [user]);

  useEffect(() => {
    // ensure admin exists (read from localStorage to avoid hook dependency)
    const stored = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const adminEmail = 'admin@admin.cl';
    if (!stored.find(u => u.email === adminEmail)){
      const admin = { email: adminEmail, username: 'Admin', fechaNacimiento: '1980-01-01', password: 'admin', cupon: '', descuento: 0, beneficio: 'Acceso total como administrador.', rol: 'admin' };
      setUsers(prev => {
        const next = [...prev, admin];
        localStorage.setItem('usuarios', JSON.stringify(next));
        return next;
      });
    }
  }, []);

  function register(newUser){
    const { beneficio, descuento } = calcularBeneficio(newUser.email, newUser.fechaNacimiento, newUser.cupon || '');
    const u = { ...newUser, beneficio, descuento, rol: newUser.rol || 'cliente' };
    setUsers(prev => [...prev, u]);
    return u;
  }

  // admin operations
  function listUsers(){ return users; }
  function addUser(userData){ const u = register(userData); return u; }
  function updateUserByIndex(i, data){ setUsers(prev => prev.map((u, idx) => idx===i ? { ...u, ...data } : u)); }
  function deleteUserByIndex(i){ setUsers(prev => prev.filter((_, idx) => idx !== i)); }

  function login(email, password){
    const found = users.find(u => u.email === email);
    if (!found) throw new Error('Usuario no registrado');
    if (found.password !== password) throw new Error('Contraseña incorrecta');
    setUser(found);
    return found;
  }

  function logout(){ setUser(null); }

  function updateProfile(updates){
    if (!user) throw new Error('No autenticado');
    setUsers(prev => prev.map(u => u.email === user.email ? { ...u, ...updates } : u));
    const updated = { ...user, ...updates };
    const bf = calcularBeneficio(updated.email, updated.fechaNacimiento, updated.cupon || '');
    const final = { ...updated, beneficio: bf.beneficio, descuento: bf.descuento };
    setUser(final);
    return final;
  }

  return (
    <AuthContext.Provider value={{ users, user, register, login, logout, updateProfile, calcularBeneficio, listUsers, addUser, updateUserByIndex, deleteUserByIndex }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){ return useContext(AuthContext); }

export default AuthContext;
