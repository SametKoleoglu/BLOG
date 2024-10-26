import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
function About() {
  return (
    <>
      <Header />

      <section className="pt-4 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto my-2">
              <h2 className="fw-bold my-3 mb-4">Misyonumuz 💪🏻</h2>
              <p className="lead mb-5">
                Yazılımla İlerle, yazılım dünyasında kendini geliştirmek isteyen
                herkesin bir araya gelerek bilgi alışverişinde bulunabileceği,
                destekleyici bir topluluk olma amacıyla kurulmuştur. Günümüzde
                yazılım, sadece bir meslek dalı değil; düşünme biçimi, problem
                çözme yeteneği ve dünyaya bakış açısı kazandıran bir disiplin
                olarak her geçen gün daha fazla insanın ilgisini çekiyor. Bu
                yolculuğa çıkmış olan bireylerin kendi yollarını çizerken
                birbirlerine rehberlik etmesini, deneyim ve bilgi birikimlerini
                paylaşmasını sağlamak için buradayız 💻 🚀.
              </p>
              <p className="lead">
                Yazılımla İlerle topluluğu olarak, yazılım dünyasına adım atan
                ve bu alanda kendini geliştirmek isteyen herkes için bir rehber
                olmayı hedefliyoruz. Amacımız, bilgiye açık ve öğrenmeye hevesli
                bireylerin bir araya geldiği, paylaşımcı ve destekleyici bir
                ortam yaratmak. Yazılım teknolojilerindeki yenilikleri takip
                eden ve topluluğun bilgisine katkı sağlayan içeriklerimizle,
                üyelerimizin gelişim yolculuklarında yanlarında olmayı
                önemsiyoruz. Yazılımla İlerle’de kullanıcılarımız, yazılıma dair
                öğrendiklerini paylaşabilir, diğer kullanıcıların
                deneyimlerinden faydalanabilir, yeni çıkan teknoloji haberlerine
                ulaşabilir ve diledikleri an topluluktaki diğer üyelerle
                iletişime geçebilir. Bu topluluk, sadece bireysel gelişimi
                değil, aynı zamanda dayanışma ve kolektif bilgi birikimini de
                önemser. Birlikte öğreniyor, keşfediyor ve yazılım dünyasında
                adım adım ilerliyoruz.Yazılımla İlerle olarak en büyük amacımız,
                yazılım alanında öğrenmeye açık ve gelişime hevesli bireyleri
                bir araya getirerek, özgün içeriklerle bilgi paylaşımı
                yapabilecekleri, karşılaştıkları sorunlara topluluk desteği ile
                çözüm bulabilecekleri bir platform yaratmak. Platformumuzda,
                yazılımla ilgili güncel gelişmeleri takip edebilir, yeni
                teknolojilere dair bilgi sahibi olabilir ve kendi içeriklerinizi
                paylaşarak topluluğa katkıda bulunabilirsiniz. Ayrıca,
                interaktif yapımız sayesinde diğer üyelerle anlık iletişim
                kurabilir, fikir alışverişinde bulunarak yazılım becerilerinizi
                geliştirmenize yardımcı olacak bir sosyal ağın parçası
                olabilirsiniz. Sonuç olarak, Yazılımla İlerle topluluğu, bilgi
                paylaşımı ve kolektif gelişim temelinde var olan bir öğrenme
                platformudur. Yazılım dünyasında attığınız her adımda size
                destek olacak, zorluklarla karşılaştığınızda yanınızda yer
                alacak ve başarılarınızı birlikte kutlayacağınız bir topluluğa
                katılmak istiyorsanız, <b>aramıza hoş geldiniz!</b> Bizimle birlikte
                Yazılımla İlerle – çünkü bu yolda, öğrenmenin ve gelişmenin
                sınırı yoktur. <br />
                <br />
                <b>
                  Sen de bu gelişim yolculuğunda bizimle birlikte ol; Yazılımla
                  İlerle 🚀
                </b>
              </p>
            
              
              <h3 className="mb-4 my-5">Ekibimiz</h3>
              <div className="row g-4">
                <div className="col-sm-6 col-lg-3">
                  <div className="text-center">
                    <div className="avatar avatar-xxl mb-2">
                      <img
                        className="avatar-img rounded-circle"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="avatar"
                      />
                    </div>
                    <h5>Louis Ferguson</h5>
                    <p className="m-0">Editor in Chief</p>
                  </div>
                </div>
              </div>
              {/* Service START */}
              <h3 className="mb-3 mt-5">Ne Yapıyoruz?</h3>
              <div className="row">
                {/* Service item*/}
                <div className="col-md-6 col-lg-4 mb-4">
                  <img
                    className="rounded"
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "cover",
                    }}
                    src="https://www.aspistrategist.org.au/wp-content/uploads/2023/11/GettyImages-467714941-1024x764.jpg"
                    alt="Card image"
                  />
                  <h4 className="mt-3">Global news services</h4>
                  <p>
                    Perceived end knowledge certainly day sweetness why
                    cordially. Ask a quick six seven offer see among.
                  </p>
                </div>
              </div>
              {/* Service END */}
            </div>{" "}
            {/* Col END */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default About;
