const Page = ({ params }) => {
  const slug = params.slug;

  return (
    <div>
      <h1>{slug}</h1>
      <p>{slug}</p>
    </div>
  );
};

export default Page;
