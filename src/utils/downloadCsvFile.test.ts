import { afterEach, describe, expect, it, vi } from 'vitest';
import { downloadCsvFile } from './downloadCsvFile';

describe('downloadCsvFile', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('creates temporary download link and downloads CSV file', () => {
    const objectUrl = 'blob:csv-file';
    const createObjectUrl = vi.fn(() => objectUrl);
    const revokeObjectUrl = vi.fn();
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const append = vi.spyOn(document.body, 'append');

    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL: createObjectUrl,
      revokeObjectURL: revokeObjectUrl,
    });

    downloadCsvFile({
      content: '"Name"\n"Rick Sanchez"',
      fileName: '1_items.csv',
    });

    const downloadLink = append.mock.calls[0][0] as HTMLAnchorElement;

    expect(downloadLink.download).toBe('1_items.csv');
    expect(downloadLink.href).toBe(objectUrl);
    expect(downloadLink.style.display).toBe('none');
    expect(click).toHaveBeenCalledTimes(1);
    expect(createObjectUrl).toHaveBeenCalledWith(expect.any(Blob));
    expect(revokeObjectUrl).toHaveBeenCalledWith(objectUrl);
    expect(document.body.contains(downloadLink)).toBe(false);
  });
});
