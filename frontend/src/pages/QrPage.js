import QRCode from "react-qr-code";

function QrPage() {
  return (
    <div>
      <h1>Table 1 QR</h1>

      <QRCode
        value="https://classy-squirrel-6b8387.netlify.app/?table=1"
      />

      <hr />

      <h1>Table 2 QR</h1>

      <QRCode
        value="https://classy-squirrel-6b8387.netlify.app/?table=2"
      />
    </div>
  );
}

export default QrPage;