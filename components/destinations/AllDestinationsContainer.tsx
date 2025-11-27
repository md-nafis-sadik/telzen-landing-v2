import AllDestinations from "./AllDestinations";


function AllDestinationsContainer() {


  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white lg:min-h-screen flex"
      id="allDestinations"
    >
      <div className="w-full">
        <div className="containerX">
          <AllDestinations />
        </div>
      </div>
    </section>
  );
}

export default AllDestinationsContainer;
