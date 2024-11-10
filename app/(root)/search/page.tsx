import Image from "next/image";

const Search = () => {
  return (
    <div className="text-center space-y-4">
      <h1>Ambalabu sedang membuat halaman ini</h1>
      <Image
        src="/images/ambalabu.jpg"
        width={500}
        height={500}
        alt="Ambalabu"
      />
    </div>
  );
};

export default Search;
