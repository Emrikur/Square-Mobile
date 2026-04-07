export default function Header() {
  return (
    <>
      <header className="header">
        <img src="#" alt="Logo" />
        <h3>Square Mobile</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "5px",
            fontSize: "0.8rem",
          }}
        >
          <p>inloggad som: Användare</p>
          <img src="#" alt="ikon" />
        </div>
      </header>
    </>
  );
}
