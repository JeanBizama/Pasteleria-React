import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8080/api';

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

const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [users, setUsers] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);

  const [isAuthChecking, setIsAuthChecking] = useState(true);
    

  const applyBenefits = useCallback((userData) => {
      const { beneficio, descuento } = calcularBeneficio(userData.email, userData.fechaNacimiento, userData.cupon || '');
      return { ...userData, beneficio, descuento };
  }, []);

  const register = useCallback(async (newUser) => {
    setIsLoading(true);
    try {
      const userToRegister = applyBenefits(newUser);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': ''
         },
        body: JSON.stringify(userToRegister),
        
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || data.message || 'Error en el registro');
      }

      localStorage.setItem('authToken', data.token);

      setToken(data.token);
      setUser(applyBenefits(data));

      return applyBenefits(data);

      } catch (error) {
      console.error('Error al registrar:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [applyBenefits]);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Credenciales inválidas');
      }

      localStorage.setItem('authToken', data.token);

      setToken(data.token);
      setUser(applyBenefits(data));
      
      return applyBenefits(data);
      } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [applyBenefits]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setUsers([]);
    localStorage.removeItem('authToken');
  }, []);

  const updateProfile = useCallback(async (updates) => {
    if (!user || !token) throw new Error('No autenticado');
    setIsLoading(true);
    try {
        // La lógica de beneficio ahora es solo para visualización inmediata en el frontend
        applyBenefits({ ...user, ...updates });
        
        const response = await fetch(`${API_BASE_URL}/usuarios/profile`, { 
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(updates), 
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.mensaje || 'Error al actualizar perfil');
        }

        setUser(applyBenefits(data)); 
        return applyBenefits(data);

    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        throw error;
    } finally {
        setIsLoading(false);
    }
  }, [user, token, applyBenefits]);

  const fetchUserFromToken = useCallback(async (storedToken) => {
    if (!storedToken) return null;

    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
          console.error("Fallo al recuperar perfil:", response.status, response.statusText);
            
            try {
                const errorBody = await response.json();
                console.error("Cuerpo del error del backend:", errorBody);
            } catch (e) {
                console.error("El backend devolvió un error no-JSON.");
            }
            // 🛑 La lógica de deslogeo se mantiene
            localStorage.removeItem('authToken');
            return null;
      }

        const userData = await response.json(); 
        
        setToken(storedToken);
        setUser(applyBenefits(userData));
        return userData;

    } catch (error) {
        console.error("Error al recuperar el perfil con token:", error);
        localStorage.removeItem('authToken');
        return null;
      }
    }, [applyBenefits]);

    useEffect(() => {
    const checkAuth = async () => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            // Llama a la API para verificar el token y cargar el usuario
            await fetchUserFromToken(storedToken); 
        }
        
        setIsAuthChecking(false);
    };
    checkAuth();
  }, [fetchUserFromToken]);

  const listUsers = useCallback(async () => {
    if (user?.rol?.toLowerCase() !== 'admin' || !token) {
        throw new Error('Acceso denegado: Se requiere rol de administrador.');
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, { // Endpoint: /api/usuarios
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}` 
        },
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || 'Error al listar usuarios');
      
      const usersWithBenefits = data.map(applyBenefits);
      setUsers(usersWithBenefits);
      return usersWithBenefits; 

    } catch (error) {
      console.error('Error al listar usuarios:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, token, applyBenefits]);

  const addUser = useCallback(async (userData) => {
    if (user?.rol?.toLowerCase() !== 'admin' || !token) {
        throw new Error('Acceso denegado: Se requiere rol de administrador.');
    }
    setIsLoading(true);
    try {
      // El endpoint de admin espera un objeto Usuario. 
      const userToSave = { ...userData, contrasena: userData.password }; 
      
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(userToSave),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || 'Error al agregar usuario');
      
      await listUsers(); 

      return applyBenefits(data);

    } catch (error) {
      console.error('Error al agregar usuario:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, token, listUsers, applyBenefits]);

  function updateUserByIndex(i, data){ 
    console.error('TODO: Refactorizar updateUserByIndex para usar el ID del usuario y llamar a PUT /api/usuarios/{id}'); 
    throw new Error('Función no implementada para API. Usar ID del usuario.');
  }


const deleteUser = useCallback(async (userId) => {
    if (user?.rol?.toLowerCase() !== 'admin' || !token) {
        throw new Error('Acceso denegado: Se requiere rol de administrador.');
    }
    
    setIsLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}` 
            },
        });

        if (!response.ok) {
            let errorMsg = 'Error al eliminar el usuario.';
            try {
                const data = await response.json();
                errorMsg = data.mensaje || errorMsg;
            } catch (e) {
            }
            throw new Error(errorMsg);
        }
        await listUsers(); 

    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    } finally {
        setIsLoading(false);
    }
  }, [user, token, listUsers]);

  return (
    <AuthContext.Provider value={{ 
      users, // Lista de usuarios (solo para admin)
      user, 
      token, // JWT
      isLoading,
      isAuthChecking,
      register, 
      login, 
      logout, 
      updateProfile,
      calcularBeneficio, 
      fetchUserFromToken,
      listUsers, 
      addUser, 
      updateUserByIndex, // Necesita refactorización
      deleteUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth(){ return useContext(AuthContext); }

export default AuthContext;
