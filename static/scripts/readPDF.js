const loadPDFjs = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.min.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load PDF.js'));
    document.head.appendChild(script);
  });
};

const renderPDF = async (url, containerId) => {
  try {
    await loadPDFjs();

    // Fetch the PDF document
    const loadingTask = pdfjsLib.getDocument(url);
    const pdfDoc = await loadingTask.promise;

    // Render the first page for simplicity. You can extend this to render all pages.
    const pageNumber = 1;
    const page = await pdfDoc.getPage(pageNumber);

    // Prepare the canvas for PDF rendering
    const container = document.getElementById(containerId);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    container.appendChild(canvas);

    // Calculate scale to fit the container's width
    const viewport = page.getViewport({ scale: 1 });
    const scale = container.clientWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    // Set canvas dimensions
    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;

    // Render the page on the canvas
    const renderContext = {
      canvasContext: context,
      viewport: scaledViewport
    };
    await page.render(renderContext).promise;
  } catch (error) {
    console.error(error);
  }
}
  

  