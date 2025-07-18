import React, { useState, useEffect } from 'react';
import { X, Key } from 'lucide-react';
import { Tokens } from '../../../../interfaces/Tokens';

interface EditTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: Tokens | null;
  onSave: (tokenData: { id: string; title: string; token: string }) => void;
}

const EditTokenModal: React.FC<EditTokenModalProps> = ({
  isOpen,
  onClose,
  token,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: '',
    token: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (isOpen && token) {
      setFormData({
        title: token.title || '',
        token: token.token || ''
      });
      setErrors({});
    }
  }, [isOpen, token]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }
    
    if (!formData.token.trim()) {
      newErrors.token = 'El token es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !token) return;
    
    setLoading(true);
    try {
      await onSave({
        id: token.id,
        title: formData.title,
        token: formData.token
      });
      onClose();
    } catch (error) {
      console.error('Error updating token:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        {/* Header */}
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

          {/* Icono de token */}
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
            <Key size={28} color="white" />
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
            Editar Token
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
            Modifica la información del token seleccionado
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
                ID del Token
              </label>
              <input
                type="text"
                value={token?.id || ''}
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

            {/* Campo Usuario (solo lectura) */}
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
                Creado por
              </label>
              <input
                type="text"
                value={token?.user?.name || ''}
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

            {/* Campo Título */}
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
                Título del Token
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ingresa el título del token"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.title ? '#ef4444' : '#f1f5f9'}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  if (!errors.title) {
                    e.target.style.borderColor = '#ED1C28';
                    e.target.style.boxShadow = '0 0 0 3px rgba(237, 28, 40, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.title) {
                    e.target.style.borderColor = '#f1f5f9';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {errors.title && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', margin: '6px 0 0 0', fontWeight: '500' }}>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Campo Token */}
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
                Token
              </label>
              <input
                type="text"
                name="token"
                value={formData.token}
                onChange={handleInputChange}
                placeholder="Ingresa el token"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.token ? '#ef4444' : '#f1f5f9'}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontWeight: '500',
                  fontFamily: 'monospace'
                }}
                onFocus={(e) => {
                  if (!errors.token) {
                    e.target.style.borderColor = '#ED1C28';
                    e.target.style.boxShadow = '0 0 0 3px rgba(237, 28, 40, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.token) {
                    e.target.style.borderColor = '#f1f5f9';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {errors.token && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', margin: '6px 0 0 0', fontWeight: '500' }}>
                  {errors.token}
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
                boxShadow: loading ? 'none' : '0 4px 12px rgba(237, 28, 40, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#C70E19';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(237, 28, 40, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#ED1C28';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(237, 28, 40, 0.3)';
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

export default EditTokenModal;