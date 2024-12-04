import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  className?: string;
}

const QRCode = ({ className = '' }: QRCodeProps) => {
  const repoUrl = 'https://github.com/mattdlong/groove-lucky-draw';
  
  return (
    <div className={`${className}`}>
      <QRCodeSVG
        value={repoUrl}
        size={80}
        bgColor="transparent"
        fgColor="#FFFFFF"
        level="L"
        includeMargin={false}
      />

    </div>
  );
};

export default QRCode;
