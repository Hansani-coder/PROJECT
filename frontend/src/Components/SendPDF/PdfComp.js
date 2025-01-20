import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComp({ pdfFile }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // Callback for when the document loads successfully
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1); // Reset to the first page
    }

    return (
        <div>
            {pdfFile ? (
                <div>
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from({ length: numPages }, (_, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        ))}
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </div>
            ) : (
                <p>No PDF file provided</p>
            )}
        </div>
    );
}

export default PdfComp;
