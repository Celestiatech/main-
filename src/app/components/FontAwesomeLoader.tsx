import Script from "next/script";

export function FontAwesomeLoader() {
  return (
    <>
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="" />
      <Script id="font-awesome-loader" strategy="afterInteractive">
        {`
          (function () {
            if (document.querySelector('link[data-font-awesome="true"]')) return;
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
            link.crossOrigin = 'anonymous';
            link.setAttribute('data-font-awesome', 'true');
            document.head.appendChild(link);
          })();
        `}
      </Script>
      <noscript>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin=""
        />
      </noscript>
    </>
  );
}
