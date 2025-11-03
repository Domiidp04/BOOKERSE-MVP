import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CreateServiceForm({ businessId, onServiceCreated }) {
  const [name, setName] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data, error: insertError } = await supabase
        .from('services')
        .insert([
          {
            business_id: businessId,
            name: name,
            duration_minutes: parseInt(durationMinutes),
            price: parseFloat(price)
          }
        ])
        .select();

      if (insertError) throw insertError;

      setSuccess('¡Servicio creado exitosamente!');
      setName('');
      setDurationMinutes('');
      setPrice('');
      
      if (onServiceCreated) {
        onServiceCreated(data[0]);
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Error al crear el servicio');
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1
  };

  return (
    <div style={formStyle}>
      <h3 style={{ marginTop: 0 }}>Crear Nuevo Servicio</h3>
      
      {error && (
        <div style={{ padding: '10px', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '15px' }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ padding: '10px', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '15px' }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nombre del servicio
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Corte de cabello"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Duración (minutos)
          </label>
          <input
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            placeholder="Ej: 30"
            min="1"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Precio (€)
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ej: 25.00"
            min="0"
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Creando...' : 'Crear Servicio'}
        </button>
      </form>
    </div>
  );
}
