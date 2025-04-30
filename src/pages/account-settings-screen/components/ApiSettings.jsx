import React, { useState } from "react";
import Icon from "components/AppIcon";

const ApiSettings = () => {
  const [tokens, setTokens] = useState([
    {
      id: 1,
      name: "Trading Bot",
      scopes: ["read", "trade"],
      created: "Jun 10, 2023",
      lastUsed: "Today",
      status: "active",
    },
    {
      id: 2,
      name: "Portfolio Tracker",
      scopes: ["read"],
      created: "May 5, 2023",
      lastUsed: "3 days ago",
      status: "active",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newToken, setNewToken] = useState({
    name: "",
    scopes: [],
  });
  const [generatedToken, setGeneratedToken] = useState(null);

  const handleScopeToggle = (scope) => {
    if (newToken.scopes.includes(scope)) {
      setNewToken({
        ...newToken,
        scopes: newToken.scopes.filter((s) => s !== scope),
      });
    } else {
      setNewToken({
        ...newToken,
        scopes: [...newToken.scopes, scope],
      });
    }
  };

  const handleCreateToken = () => {
    // In a real app, this would call an API to create a token
    const mockToken = "dt_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setGeneratedToken(mockToken);
  };

  const handleSaveToken = () => {
    const newTokenObj = {
      id: tokens.length + 1,
      name: newToken.name,
      scopes: newToken.scopes,
      created: "Today",
      lastUsed: "Never",
      status: "active",
    };
    
    setTokens([...tokens, newTokenObj]);
    setShowCreateForm(false);
    setGeneratedToken(null);
    setNewToken({
      name: "",
      scopes: [],
    });
  };

  const handleRevokeToken = (id) => {
    setTokens(tokens.map(token => 
      token.id === id ? { ...token, status: "revoked" } : token
    ));
  };

  const handleDeleteToken = (id) => {
    setTokens(tokens.filter(token => token.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">API Access Tokens</h3>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center"
            disabled={showCreateForm}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            <span>Create New Token</span>
          </button>
        </div>
        
        <p className="text-sm text-text-secondary mb-6">
          API tokens allow external applications to authenticate with our service on your behalf.
          Be careful, as tokens have access to your account based on the permissions you grant.
        </p>
        
        {showCreateForm && (
          <div className="mb-6 p-4 border border-border rounded-lg bg-gray-50">
            {!generatedToken ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="tokenName" className="block text-sm font-medium text-text-secondary mb-1">
                    Token Name
                  </label>
                  <input
                    type="text" id="tokenName"
                    value={newToken.name}
                    onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                    placeholder="e.g., Trading Bot, Portfolio Tracker" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Token Permissions
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox" id="scopeRead" checked={newToken.scopes.includes("read")}
                        onChange={() => handleScopeToggle("read")}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <label htmlFor="scopeRead" className="ml-2 text-sm text-text-secondary">
                        Read (View account information and market data)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox" id="scopeTrade" checked={newToken.scopes.includes("trade")}
                        onChange={() => handleScopeToggle("trade")}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <label htmlFor="scopeTrade" className="ml-2 text-sm text-text-secondary">
                        Trade (Place and manage trades)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox" id="scopeWithdraw" checked={newToken.scopes.includes("withdraw")}
                        onChange={() => handleScopeToggle("withdraw")}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <label htmlFor="scopeWithdraw" className="ml-2 text-sm text-text-secondary">
                        Withdraw (Transfer funds from your account)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border border-border rounded-lg text-text-secondary mr-3 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateToken}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                    disabled={!newToken.name || newToken.scopes.length === 0}
                  >
                    Generate Token
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Your New API Token
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={generatedToken}
                      readOnly
                      className="flex-1 px-3 py-2 border border-border rounded-l-lg focus:ring-primary focus:border-primary text-text-primary bg-gray-100"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedToken)}
                      className="px-3 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-hover transition-colors"
                    >
                      <Icon name="Copy" size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-danger mt-1">
                    This token will only be shown once. Please copy it now and store it securely.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setShowCreateForm(false);
                      setGeneratedToken(null);
                    }}
                    className="px-4 py-2 border border-border rounded-lg text-text-secondary mr-3 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveToken}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Save Token
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          {tokens.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Icon name="Key" size={24} className="text-text-tertiary" />
              </div>
              <h4 className="text-sm font-medium text-text-primary mb-1">No API Tokens</h4>
              <p className="text-xs text-text-tertiary">
                You haven't created any API tokens yet.
              </p>
            </div>
          ) : (
            tokens.map((token) => (
              <div 
                key={token.id} 
                className={`p-4 border rounded-lg ${
                  token.status === "active" ? "border-border" : "border-border bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-text-primary">{token.name}</h4>
                      {token.status === "active"? ( <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-success-light text-success rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-text-tertiary rounded-full">
                          Revoked
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-text-tertiary">Created: {token.created}</span>
                      <span className="mx-2 text-text-tertiary">•</span>
                      <span className="text-xs text-text-tertiary">Last used: {token.lastUsed}</span>
                    </div>
                  </div>
                  
                  <div className="flex">
                    {token.status === "active" && (
                      <button
                        onClick={() => handleRevokeToken(token.id)}
                        className="text-danger text-sm hover:text-danger mr-3"
                      >
                        Revoke
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteToken(token.id)}
                      className="text-text-tertiary hover:text-text-secondary"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {token.scopes.map((scope) => (
                      <span 
                        key={scope} 
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-text-secondary rounded-full"
                      >
                        {scope === "read" && "Read"}
                        {scope === "trade" && "Trade"}
                        {scope === "withdraw" && "Withdraw"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">API Documentation</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
              <Icon name="BookOpen" size={18} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">Getting Started Guide</h4>
              <p className="text-xs text-text-secondary mb-1">
                Learn how to authenticate and make your first API request
              </p>
              <a href="#" className="text-xs text-primary font-medium hover:text-primary-hover">
                View Documentation
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
              <Icon name="Code" size={18} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">API Reference</h4>
              <p className="text-xs text-text-secondary mb-1">
                Complete documentation of all available endpoints
              </p>
              <a href="#" className="text-xs text-primary font-medium hover:text-primary-hover">
                View Documentation
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
              <Icon name="Github" size={18} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">Sample Code & SDKs</h4>
              <p className="text-xs text-text-secondary mb-1">
                Example implementations in various programming languages
              </p>
              <a href="#" className="text-xs text-primary font-medium hover:text-primary-hover">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;