

export default function Signup({children}) {
  return (
    <div
      className="mx-auto p-1 "
      style={{
        width: "80%",
        maxWidth: "90%", 
        height: "auto",
        opacity: "1",
        backgroundImage: "linear-gradient(90deg, #3F71FF, #AA54FF)",
        borderRadius: "15px",
      }}
    >
        {children}
    </div>
  );
}
