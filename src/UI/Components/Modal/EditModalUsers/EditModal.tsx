import React, { useState, useEffect, useCallback } from 'react';
import { X, SquarePen } from 'lucide-react';
import { Users } from '../../../../interfaces/Users';
import { GetRoles } from '../../../../service';

interface Role {
  id: string;
  name: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Users | null;
  onSave: (userData: { id: string; name: string; email: string; roleId: string }) => void;
  token: string | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
  token
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleId: ''
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Función para obtener los roles
  const fetchRoles = useCallback(async () => {
    try {
      const rolesData = await GetRoles(token);
      setRoles(rolesData);
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Datos de ejemplo en caso de error
    }
  },[token]);

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        roleId: user.role.id || ''
      });
      fetchRoles();
      setErrors({});
    }
  }, [isOpen, user, fetchRoles]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    
    if (!formData.roleId) {
      newErrors.roleId = 'Debe seleccionar un rol';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) return;
    
    setLoading(true);
    try {
      await onSave({
        id: user.id,
        name: formData.name,
        email: formData.email,
        roleId: formData.roleId
      });
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '100vh',
          overflow: 'hidden',
          border: '1px solid #f1f5f9'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con icono de éxito */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '32px 24px 24px 24px',
            borderBottom: '1px solid #f1f5f9',
            position: 'relative'
          }}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} color="#64748b" />
          </button>

          {/* Icono de editar */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ED1C28',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}
          >
            <SquarePen size={28} color="white" />
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              color: '#1e293b',
              textAlign: 'center',
              marginBottom: '8px'
            }}
          >
            Editar Usuario
          </h2>
          
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: '#64748b',
              textAlign: 'center',
              lineHeight: '1.5'
            }}
          >
            Modifica la información del usuario seleccionado
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '24px' }}>
            {/* Campo ID (solo lectura) */}
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}
              >
                ID de Usuario
              </label>
              <input
                type="text"
                value={user?.id || ''}
                disabled
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #f1f5f9',
                  borderRadius: '12px',
                  fontSize: '14px',
                  backgroundColor: '#f8fafc',
                  color: '#64748b',
                  boxSizing: 'border-box',
                  fontWeight: '500'
                }}
              />
            </div>

            {/* Campo Nombre */}
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}
              >
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ingresa el nombre completo"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.name ? '#ef4444' : '#f1f5f9'}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  if (!errors.name) {
                    e.target.style.borderColor = '#ED1C28';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.name) {
                    e.target.style.borderColor = '#f1f5f9';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {errors.name && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', margin: '6px 0 0 0', fontWeight: '500' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Campo Email */}
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ejemplo@correo.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.email ? '#ef4444' : '#f1f5f9'}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#ED1C28';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#f1f5f9';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {errors.email && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', margin: '6px 0 0 0', fontWeight: '500' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Campo Rol */}
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}
              >
                Rol del Usuario
              </label>
              <select
                name="roleId"
                value={formData.roleId}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.roleId ? '#ef4444' : '#f1f5f9'}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  if (!errors.roleId) {
                    e.target.style.borderColor = '#ED1C28';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.roleId) {
                    e.target.style.borderColor = '#f1f5f9';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <option value="">Selecciona un rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.roleId && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', margin: '6px 0 0 0', fontWeight: '500' }}>
                  {errors.roleId}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              padding: '24px',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#fafbfc'
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                backgroundColor: 'white',
                color: '#64748b',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '12px',
                backgroundColor: loading ? '#94a3b8' : '#ED1C28',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                minWidth: '120px',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#C70E19';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#ED1C28';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }
              }}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;