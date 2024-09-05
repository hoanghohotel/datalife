"use client"; // Add this line at the top
import { useState } from 'react';
import axios from 'axios';

const DomainForm: React.FC = () => {
    const [domain, setDomain] = useState('');
    const [version, setVersion] = useState('');
    const [key, setKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/api/generateKey', { domain, version });
            setKey(response.data.key);
        } catch (error) {
            setError('Error ^^');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Domain</h1>
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="mb-3">
                    <label htmlFor="domain" className="form-label">Domain:</label>
                    <input
                        type="text"
                        id="domain"
                        name="domain"
                        className="form-control"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="version" className="form-label">Version:</label>
                    <select
                        id="version"
                        name="version"
                        className="form-select"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        required
                    >    <option value="">---- Version ----</option>
                        <option value="1406">DataLife Engine v.17.2</option>
                        <option value="2402">DataLife Engine v.17.1</option>
                        <option value="2317">DataLife Engine v.17.0</option>
                        {/* Thêm các phiên bản khác nếu cần */}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Get License</button>
            </form>

            {error && <div className="alert alert-danger mt-4">{error}</div>}
            {key && <div className="alert alert-success mt-4">Generated key: <strong>{key}</strong></div>}
        </div>
    );
};

export default DomainForm;
