import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, FileText, UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ADMIN_PASSWORD = 'admin123';

const documents = {
  DPS: {
    DRILLING: [
      { name: 'Drilling Connection', file: '/Drilling Connection.pdf' },
      { name: 'Laying Down Tools', file: '/Laying Down Tools.pdf' },
    ],
    DECK: [
      { name: 'Tandem Lift', file: '/Tandem Lift.pdf' },
    ],
  },
  DTH: {
    DRILLING: [
      { name: 'Drilling Connection', file: '/Drilling Connection.pdf' },
      { name: 'Laying Down Tools', file: '/Laying Down Tools.pdf' },
    ],
    DECK: [
      { name: 'Tandem Lift', file: '/Tandem Lift.pdf' },
    ],
  },
};

export default function DeeJayBDApp() {
  const [selectedRig, setSelectedRig] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authPending, setAuthPending] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const rigs = Object.keys(documents);
  const departments = selectedRig ? Object.keys(documents[selectedRig]) : [];
  const files = selectedRig && selectedDept ? documents[selectedRig][selectedDept] : [];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`File '${file.name}' would be uploaded and synced.`);
    }
  };

  const handleAdminAccess = () => {
    setAuthPending(true);
  };

  const verifyPassword = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      alert('Incorrect password.');
    }
    setAuthPending(false);
    setPasswordInput('');
  };

  return (
    <div className="p-6 grid gap-6">
      {!selectedRig && (
        <div className="grid grid-cols-2 gap-4">
          {rigs.map(rig => (
            <Card key={rig} onClick={() => setSelectedRig(rig)} className="cursor-pointer hover:shadow-xl">
              <CardContent className="flex items-center gap-2 p-4">
                <FolderOpen className="w-6 h-6" />
                <span className="text-xl font-semibold">{rig}</span>
              </CardContent>
            </Card>
          ))}
          {!isAdmin && !authPending && (
            <div>
              <Button onClick={handleAdminAccess} variant="outline">Enter Admin Mode</Button>
            </div>
          )}
          {authPending && (
            <div className="flex flex-col gap-2">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <Button onClick={verifyPassword}>Submit</Button>
            </div>
          )}
          {isAdmin && <div className="text-green-600 font-medium">Admin Mode Enabled</div>}
        </div>
      )}

      {selectedRig && !selectedDept && (
        <div className="grid grid-cols-2 gap-4">
          {departments.map(dept => (
            <Card key={dept} onClick={() => setSelectedDept(dept)} className="cursor-pointer hover:shadow-xl">
              <CardContent className="flex items-center gap-2 p-4">
                <FolderOpen className="w-6 h-6" />
                <span className="text-xl font-semibold">{dept}</span>
              </CardContent>
            </Card>
          ))}
          <Button onClick={() => setSelectedRig(null)}>Back</Button>
        </div>
      )}

      {selectedDept && (
        <div className="grid gap-4">
          {files.map(file => (
            <Card key={file.name} className="hover:shadow-lg">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>{file.name}</span>
                </div>
                <a href={file.file} target="_blank" rel="noopener noreferrer">
                  <Button>Open PDF</Button>
                </a>
              </CardContent>
            </Card>
          ))}

          {isAdmin && (
            <div className="flex flex-col items-start gap-4">
              <label className="font-semibold flex items-center gap-2">
                <UploadCloud className="w-5 h-5" /> Upload or Replace PDF:
              </label>
              <input type="file" accept="application/pdf" onChange={handleFileUpload} />
            </div>
          )}

          <Button onClick={() => setSelectedDept(null)}>Back</Button>
        </div>
      )}
    </div>
  );
}
