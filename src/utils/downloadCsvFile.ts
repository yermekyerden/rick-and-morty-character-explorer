interface DownloadCsvFileOptions {
  content: string;
  fileName: string;
}

const CSV_MIME_TYPE = 'text/csv;charset=utf-8';

export function downloadCsvFile({
  content,
  fileName,
}: DownloadCsvFileOptions): void {
  const csvBlob = new Blob([content], {
    type: CSV_MIME_TYPE,
  });

  const objectUrl = URL.createObjectURL(csvBlob);
  const downloadLink = document.createElement('a');

  downloadLink.href = objectUrl;
  downloadLink.download = fileName;
  downloadLink.style.display = 'none';

  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  URL.revokeObjectURL(objectUrl);
}
