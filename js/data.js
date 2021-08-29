(() => {
  const d = document,
    $container = d.querySelector(".container"),
    $title = d.querySelector(".crud_title"),
    $form = d.querySelector(".crud_form"),
    $template = d.getElementById("template").content,
    $fragment = d.createDocumentFragment();

  const getAll = async () => {
    try {
      let res = await fetch("http://localhost:4000/api/products");
      if (!res.ok)
        throw {
          status: res.status || "00",
          statusText: res.statusText || "Ocurrió un error",
        };

      let json = await res.json();

      json.forEach((el) => {
        $template.querySelector(".img").setAttribute("src", el.imgURL);
        $template.querySelector(".name").textContent = el.name;
        $template.querySelector(".category").textContent = el.category;
        $template.querySelector(".price").textContent = el.price;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $container.appendChild($fragment);

      console.log(json);
    } catch (err) {
      let message = `status: ${err.status} : ${err.statusText}`;
      $container.appendChild(message);
      console.log(message);
    }
  };

  d.addEventListener("DOMContentLoaded", getAll);

  d.addEventListener("submit", async (e) => {
    if (e.target === $form) {
      e.preventDefault();

      if (!e.target.id.value) {
        //POST

        try {
          let options = {
            method: "POST",
            headers: {
              "Content-type": "application/json;charset=utf-8",
              "x-access-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTliYzkxNTJmMWE2MzNmY2NhZTRhOSIsImlhdCI6MTYyOTgyOTYwNSwiZXhwIjoxNjI5OTE2MDA1fQ.EADLd6tHMUJfuzd642XJV8vS7wS1UtDrgkks_1XPm2w",
            },
            body: JSON.stringify({
              name: e.target.nombre.value,
              category: e.target.categoria.value,
              price: e.target.precio.value,
              imgURL: e.target.imgURL.value,
            }),
          };

          let res = await fetch("http://localhost:4000/api/products", options);

          if (!res.ok)
            throw {
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            };

          let json = await res.json();
          location.reload();
        } catch (err) {
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}</b>:${err.statusText}</p>`
          );
        }
      } else {
        //PUT
      }
    }
  });
})();
