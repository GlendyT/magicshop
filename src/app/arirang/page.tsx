const Arirang = () => {
  return (
    <div className="min-h-screen flex flex-col px-8 items-center justify-center">
      <h1 className="text-4xl font-extrabold uppercase text-red-700">
        Arirang
      </h1>
      <div>
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/prerelease/1DcxHW214MCDxXju71RbvX?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen={false}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Arirang;
