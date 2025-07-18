
import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  title = "¡Datos enviados exitosamente!",
  message = "La información que añadiste será publicada y visible para el equipo."
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '480px',
        width: '90%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        textAlign: 'center'
      }}>
        {/* Icono de éxito */}
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#10B981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto'
        }}>
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        </div>

        {/* Título */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1F2937',
          marginBottom: '12px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {title}
        </h2>

        {/* Mensaje */}
        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          marginBottom: '32px',
          lineHeight: '1.5',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {message}
        </p>

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#E53E3E',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 32px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#C53030';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#E53E3E';
          }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default SuccessModal