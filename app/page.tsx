"use client";
import { useState } from 'react';
import Head from 'next/head';
import "./globals.css";


export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <p>Simplify your Links</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Long URL"
            required
          />
          <button type="submit">Shorten</button>
        </div>
      </form>
      {shortUrl && (
        <div className="result">
          <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
        </div>
      )}
       <style jsx>{`
       
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #501389;
          color: #ffffff;
          font-family: Arial, sans-serif;
          padding: 20px;
          box-sizing: border-box;
          
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
             }

        .input-group {
          display: flex;
          width: 100%;
          max-width: 600px;
          margin-bottom: 1rem;
        }

        input[type="url"] {
          flex-grow: 1;
          padding: 0.75rem;
          font-size: 1rem;
          border: 2px solid #4a4a4a;
          border-radius: 4px 0 0 4px;
          background-color: #2a2a2a;
          color: #ffffff;
        }

        input[type="url"]::placeholder {
          color: #888888;
        }
           button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          background-color: #0066cc;
          color: #ffffff;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #0052a3;
        }

        .result {
          margin-top: 2rem;
          text-align: center;
        }
           .result a {
          color: #0066cc;
          text-decoration: none;
          font-weight: bold;
        }

        .result a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}