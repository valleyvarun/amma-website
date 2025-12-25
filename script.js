const pdfContainer = document.getElementById('pdf-container');
const pdfUrl = 'Anantaa Aktiiv Foods and Beverages.pdf';

async function loadPdf() {
    try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        console.log('PDF loaded');
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            await renderPage(pdf, pageNum);
        }
    } catch (error) {
        console.error('Error loading PDF:', error);
        pdfContainer.innerHTML = '<p>Error loading PDF. Please ensure "Anantaa Aktiiv Foods and Beverages.pdf" is in the same folder.</p>';
    }
}

async function renderPage(pdf, pageNum) {
    const page = await pdf.getPage(pageNum);
    
    // Set scale (1.75 for better quality)
    const scale = 1.75;
    const viewport = page.getViewport({ scale: scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Add canvas to DOM immediately to maintain order
    pdfContainer.appendChild(canvas);

    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };

    await page.render(renderContext).promise;
}

// Start loading immediately
loadPdf();
