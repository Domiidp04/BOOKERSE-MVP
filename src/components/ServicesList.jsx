import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function ServicesList({ businessId, isOwner = false }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, [businessId]);

  const loadServices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    setServices(data || []);
    setLoading(false);
  };

  const deleteService = async (serviceId) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceId);

    if (!error) {
      loadServices();
    }
  };

  if (loading) {
    return <p>Cargando servicios...</p>;
  }

  if (services.length === 0) {
    return (
      <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
        <p>No hay servicios disponibles</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Servicios {isOwner ? 'Creados' : 'Disponibles'}</h3>
      <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {services.map((service) => (
          <div
            key={service.id}
            style={{
              padding: '20px',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }}
          >
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{service.name}</h4>
            <div style={{ color: '#666', marginBottom: '10px' }}>
              <p style={{ margin: '5px 0' }}>
                <strong>⏱️ Duración:</strong> {service.duration_minutes} minutos
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>💰 Precio:</strong> {service.price}€
              </p>
            </div>
            
            {isOwner && (
              <button
                onClick={() => deleteService(service.id)}
                style={{
                  padding: '8px 16px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
