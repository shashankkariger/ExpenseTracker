import JSZip from 'jszip';
import { JAVA_SOURCE_FILES } from '../data/javaSourceFiles';

export async function generateProjectZip(): Promise<Blob> {
  const zip = new JSZip();

  // Root folder
  const rootFolder = zip.folder('personal-expense-tracker');
  if (!rootFolder) {
    throw new Error('Failed to create root folder in ZIP');
  }

  for (const file of JAVA_SOURCE_FILES) {
    rootFolder.file(file.path, file.content);
  }

  return await zip.generateAsync({ type: 'blob' });
}

export async function downloadProjectZip(): Promise<void> {
  const blob = await generateProjectZip();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'personal-expense-tracker-java-oop.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
