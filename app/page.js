import CategoryLists from "./components/CategoryLists";

/* Fetching Main Category Lists */
async function getCategories() {
  const res = await fetch("https://staging.mazaady.com/api/v1/get_all_cats", {
    method:"GET",
    headers:{
      "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16"
    }
  });
  return res.json();
}

export default async function Home() {

  /* getting main category list */
  const getCats = await getCategories();
  const Cats = getCats.data.categories;

  return (
    <>
      <div className="main py-6">
        <CategoryLists Cats={Cats} />
      </div>
    </>
  );
}
