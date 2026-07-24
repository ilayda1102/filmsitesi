function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 id="heroTitle">Spider-Man: Brand New Day</h1>

        <p id="heroDescription">
          Peter Parker, yeni bir tehditle karşı karşıya kalırken
          geçmişiyle yüzleşmek zorunda kalır.
        </p>

        <div className="hero-buttons">
          <button className="watch-btn">İzle</button>
          <button className="trailer-btn">Fragman</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;