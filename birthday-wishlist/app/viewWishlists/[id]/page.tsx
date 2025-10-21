import Image from "next/image";
import BirthdayBoxGif from "../../../public/m024t0224_d_gift_box_06sep22.jpg";

export interface WishItem {
  id: number;
  title: string;
  description: string;
  price: string;
  imgUrl: string;
  giftGetters: string[];
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

type tParams = Promise<{ id: string }>;


export default async function ViewWishesPage(props: { params: tParams}) {
  const { id } = await props.params;

  const data: WishItem[] = [
    {
      id: 1,
      title: "Barca Jersey",
      description: "Because Barca is the best club in the world, and why not?",
      price: "20,000",
      imgUrl: "/DSC08725-700x700.jpg",
      giftGetters: ["Nihel"],
    },
    {
      id: 2,
      title: "Google Pixel 9",
      description:
        "My old phone is spoilt and new, a new phone would literally make me the happiest person right now, I can perform a lot of more extensive task on it.",
      price: "1,050,000",
      imgUrl: "/1.jpg",
      giftGetters: ["Uncle Kunle"],
    },
    {
      id: 3,
      title: "Dr. Martins Shoes",
      description:
        "New age means coming in with new swag, I can't be growing up and my style does not change, a Dr. Martins Shoes would go with my corporate outfits",
      price: "30,000",
      imgUrl: "/1 (1).jpg",
      giftGetters: [""],
    },
  ];

  //  If I want to add a functionality, where someone that has promised to get you a gift, would write down their name.
  // so for the person viewing the wishes, they can write down their name that they want to get this person this gift, and when they reserve their name.
  // And when the owner of the account logs in, they can see the number of people who have reserved to get them the gifts.

  return (
    <div>
      <div className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
        <Image
          src={BirthdayBoxGif} // replace with your image path
          alt="Birthday Gift Box"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold drop-shadow-lg">
          View Stephanie Birthday Wishlist 🎉
        </h1>
      </div>
      <div>
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-2xl font-bold mt-10">
            View Wishes for: {decodeURIComponent(id)}
          </h1>
        </div>
        <div className="max-w-6xl mx-auto p-4 space-y-4 mt-2">
          {data.map((wish) => (
            <div
              className="collapse collapse-arrow bg-slate-100 border border-base-300"
              key={wish.id}>
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold text-blue-900">
                {wish.title}
              </div>

              <div className="collapse-content text-sm flex flex-col gap-1 text-blue-900">
                <span className="">Why I need this {wish.title}?</span>
                <span>{wish.description}</span>
                <span>
                  <b>Price: {wish.price}</b>
                </span>

                <Image
                  src={wish.imgUrl}
                  alt={wish.title}
                  width={200}
                  height={200}
                  className="mt-5 mb-3"
                />

                <span>
                  Do you wish to get this gift for this special individual,
                  please, reserve your name below.
                </span>
                <div className="flex items-center gap-5">
                  <input
                    type="text"
                    placeholder="Reserve Gift"
                    className="border bg-gray-600 text-white  p-3 rounded w-[600px]"
                  />
                  <button className="btn btn-primary">Add Name</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
