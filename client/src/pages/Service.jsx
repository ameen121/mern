import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();
  console.log('services data:', services);

  // Handle the case where services might be undefined or an empty array
  if (!services || services.length === 0) {
    return <p>No services available</p>;
  }

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading"> Our Services</h1>
      </div>
      <div className="container grid grid-three-cols">
        {services.map((curlElem, index) => (
          <div className="card" key={index}>
            <div className="card-image">
              <img src="/images/design.png" alt="Service" height="300" width="300"/>
            </div>
            <div className="card-details">
              <div className="grid grid-two-col">
                <p>{curlElem.provider}</p>
                <p>{curlElem.price}</p>
              </div>
              <p>{curlElem.service}</p>
              <p>{curlElem.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
