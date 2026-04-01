import { FC, useState, useRef } from 'react';
import { Button } from '@/components/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog/Dialog';
import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';
import { useBatchImportTravelAgentsMutation } from '@/api/travelAgentsEndpoints';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/Card/Card';

interface ImportResult {
  created: number;
  skipped: number;
  failed: number;
  skippedEmails: string[];
  errors: Array<{ row: number; email?: string; error: string }>;
}

export const ImportTravelAgentsDialog: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { agencyId } = useParams<{ agencyId: string }>();

  const [batchImport, { isLoading }] = useBatchImportTravelAgentsMutation();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid Excel file (.xlsx or .xls)');
        return;
      }
      setSelectedFile(file);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile || !agencyId) return;

    try {
      const result = await batchImport({
        agencyId,
        file: selectedFile,
      }).unwrap();

      setImportResult(result as ImportResult);
    } catch (error: any) {
      console.error('Import failed:', error);
      alert(error?.data?.message || 'Import failed. Please try again.');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        <div className="flex items-center gap-2">
          <Upload size={20} />
          <span>Import from Excel</span>
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import Travel Agents from Excel</DialogTitle>
            <DialogDescription>
              Upload an Excel file (.xlsx or .xls) with travel agent information.
              Required columns: firstName, lastName, email, phoneNumber
            </DialogDescription>
          </DialogHeader>

          <a
            href="/agents2.xlsx"
            download="agents2.xlsx"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            <Download size={16} />
            Download example file
          </a>

          <div className="space-y-6 mt-4">
            {/* File Upload Section */}
            {!importResult && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
                    <FileSpreadsheet size={48} className="text-gray-400 mb-4" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="excel-upload"
                    />
                    <label
                      htmlFor="excel-upload"
                      className="cursor-pointer text-center"
                    >
                      <div className="text-sm text-gray-600 mb-2">
                        {selectedFile ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle size={20} className="text-green-500" />
                            <span className="font-medium">{selectedFile.name}</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-blue-600 font-medium hover:underline">
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        Excel files only (.xlsx, .xls)
                      </div>
                    </label>
                  </div>

                  {selectedFile && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={handleImport}
                        loading={isLoading}
                        className="flex-1"
                      >
                        Import Agents
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        disabled={isLoading}
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Import Results Section */}
            {importResult && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Import Summary</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                        <CheckCircle size={24} className="text-green-600" />
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {importResult.created}
                          </div>
                          <div className="text-sm text-gray-600">Created</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                        <AlertCircle size={24} className="text-yellow-600" />
                        <div>
                          <div className="text-2xl font-bold text-yellow-600">
                            {importResult.skipped}
                          </div>
                          <div className="text-sm text-gray-600">Skipped</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                        <XCircle size={24} className="text-red-600" />
                        <div>
                          <div className="text-2xl font-bold text-red-600">
                            {importResult.failed}
                          </div>
                          <div className="text-sm text-gray-600">Failed</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skipped Emails */}
                {importResult.skippedEmails.length > 0 && (
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-yellow-600">
                        Skipped Agents (Already Exist)
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-40 overflow-y-auto">
                        <ul className="space-y-1">
                          {importResult.skippedEmails.map((email, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 flex items-center gap-2"
                            >
                              <AlertCircle size={16} className="text-yellow-500" />
                              {email}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Errors */}
                {importResult.errors.length > 0 && (
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-red-600">
                        Failed Imports
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-60 overflow-y-auto">
                        <ul className="space-y-2">
                          {importResult.errors.map((error, index) => (
                            <li
                              key={index}
                              className="text-sm p-3 bg-red-50 rounded border-l-4 border-red-500"
                            >
                              <div className="flex items-start gap-2">
                                <XCircle size={16} className="text-red-500 mt-0.5" />
                                <div>
                                  <div className="font-medium text-red-700">
                                    Row {error.row}
                                    {error.email && ` - ${error.email}`}
                                  </div>
                                  <div className="text-red-600">{error.error}</div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-2">
                  <Button onClick={handleReset} variant="outline" className="flex-1">
                    Import Another File
                  </Button>
                  <Button onClick={handleClose} className="flex-1">
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

