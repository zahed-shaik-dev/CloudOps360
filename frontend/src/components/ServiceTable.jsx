function ServiceTable({ services }) {
  return (
    <div className="service-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">SERVICE CATALOG</p>
          <h3>Service Health</h3>
        </div>

        <span>{services.length} services</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Environment</th>
              <th>Status</th>
              <th>Version</th>
              <th>Uptime</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <strong>{service.name}</strong>
                </td>

                <td>
                  <span className="environment">
                    {service.environment}
                  </span>
                </td>

                <td>
                  <span className="service-status">
                    <span className="status-dot" />
                    {service.status}
                  </span>
                </td>

                <td>
                  <code>{service.version}</code>
                </td>

                <td>{service.uptime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceTable;