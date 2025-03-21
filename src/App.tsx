import { useState } from 'react'
import './App.css'
import { helloWorldFunction } from './firebase'

function App() {
  const [loading, setLoading] = useState(false)
  const [prosecutionSummary, setProsecutionSummary] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisResult, setAnalysisResult] = useState('')
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0])
    }
  }
  
  const handleAnalyze = async () => {
    setLoading(true)
    try {
      // This will eventually call the backend Cloud Function
      const result = await helloWorldFunction()
      setAnalysisResult(result.data)
    } catch (error) {
      if (error instanceof Error) {
        setAnalysisResult("Error: " + error.message)
      } else {
        setAnalysisResult("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <h1>ReasonedDefense</h1>
        <p className="tagline">AI-Driven Legal Analysis</p>
      </header>
      
      {/* Main Content Section */}
      <main className="main-content">
        {/* Input Section */}
        <section className="input-section">
          <h2>Case Analysis</h2>
          
          <div className="input-group">
            <label htmlFor="prosecution-summary">Prosecution Summary</label>
            <textarea 
              id="prosecution-summary"
              value={prosecutionSummary}
              onChange={(e) => setProsecutionSummary(e.target.value)}
              placeholder="Enter the summary of the prosecution case here..."
              rows={6}
            />
          </div>
          
          <div 
            className="file-upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <p>Drag and drop your case file (PDF) here or</p>
            <input
              type="file"
              id="case-file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="case-file" className="file-select-button">
              Select File
            </label>
            {selectedFile && (
              <p className="selected-file-name">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
          
          <button 
            className="analyze-button" 
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </section>
        
        {/* Results Section */}
        <section className="results-section">
          <h2>Analysis Results</h2>
          <div className="results-container">
            {analysisResult ? (
              <p>{analysisResult}</p>
            ) : (
              <p className="placeholder-text">Analysis results will appear here.</p>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 ReasonedDefense</p>
      </footer>
    </div>
  )
}

export default App
