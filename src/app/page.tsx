import { subtitle, title } from "@/components/stateless/primitives";
import { Image } from "@nextui-org/image";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import clsx from "clsx";

export default function Home() {
  return (
    <section className="pt-10">
      <h2 className={clsx(title())}>Explore</h2>
      <h4 className={clsx(subtitle())}>who knows you might like it</h4>

      {/* Card Jumbotron */}
      <div className="flex pt-10 gap-3">
        <div className="w-full h-auto bg-red-300 p-5 flex flex-row-reverse justify-between">
          <Image
            className="w-40 h-60"
            src="https://otakudesu.media/wp-content/uploads/2022/12/Do-It-Yourself-Sub-Indo.jpg"
            alt="Do-It-Yourself"
          />
          <span className="w-2/3">
            <h3 className={clsx(title({ size: "card" }))}>Do It Yourself</h3>
            <ScrollShadow hideScrollBar className="pt-2 h-56">
              Serufu Yua dan teman masa kecilnya, Miku “Purin” memutuskan
              mendaftar di sebuah SMK bernama Yuyu Girls. Sayangnya, hanya Miku
              yang diterima di sekolah tersebut. Untuk itu, Serufu memilih
              mendaftar di sebuah SMA Wanita Gatagata. Ketika hari pertama
              sekolah, Serufu mengalami kecelakaan sepeda dengan seorang
              perjalan kaki bernama Rei Yasaku. Ketika itu, sepeda Serufu
              mengalami sedikit kerusakan. Dengan inisiatifnya, Rei memperbaiki
              sepeda milik Serufu. Usut punya usut, Rei merupakan anggota dari
              klub DIY atau Do It Yourself, sebuah klub yang terancam tertutup
              karena kekurangan anggota. Serufu yang menyadari bahwa ini
              merupakan kesempatan untuk berkembang, ia memilih bergabung dengan
              klub tersebut.
            </ScrollShadow>
          </span>
        </div>
        <div className="w-full h-80 bg-blue-300"></div>
      </div>
    </section>
  );
}
