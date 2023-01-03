<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- https://github.com/othneildrew -->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<a href="https://github.com/nuromirzak/aqyndar">
    <img src="./public/icons/android-chrome-192x192.png" alt="Logo" width="80" height="80">
  </a>

# Aqyndar [![kk](https://img.shields.io/badge/lang-kk-blue.svg)](./README.md) [![en](https://img.shields.io/badge/lang-en-yellow.svg)](./README.en.md) [![ru](https://img.shields.io/badge/lang-ru-red.svg)](./README.ru.md)

Қазақстан жазушыларының және ақындарының поэемаларын түсінікті тілде жеткізу

[Документацияны оқу](https://github.com/nuromirzak/aqyndar) · [Қате туралы хабарлау](https://github.com/nuromirzak/aqyndar/issues) · [Өзгеріс ұсыну](https://github.com/nuromirzak/aqyndar/issues)

<!-- TABLE OF CONTENTS -->
## Мазмұн

1. [Проект туралы](#жоба-туралы)
   - [Қолданылған құралдар](#қолданылған-құралдар)
2. [Проектке кірісу](#проектке-кірісу)
    - [Алғышарттар](#алғышарттар)
    - [Орнату](#орнату)
3. [Үлес қосу](#үлес-қосу)
4. [Лицензия](#лицензия)
5. [Контакттер](#контакттер)

<!-- ABOUT THE PROJECT -->

## Жоба туралы

<table>
  <tr>
    <td valign="top" colspan="2"><img src="./public/images/screenshot_1.png"/></td>
  </tr>
  <tr>
    <td valign="top"><img src="./public/images/screenshot_2.png"/></td>
    <td valign="top"><img src="./public/images/screenshot_3.png"/></td>
  </tr>
</table>

Бұл вебсайттың мақсаты - Қазақстан жазушыларының және ақындарының поэемаларын халыққа түсінікті тілде жеткізу. Бұл
проект краудсорсинг принциптеріне сүйенеді. Адамдар өз еркі бойынша, сайтқа өлеңдер/аннотациялар қосады.

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

### Қолданылған құралдар

* [![Express][Express.js]][Express-url]
* [![Mongo][MongoDB]][Mongo-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

<!-- GETTING STARTED -->

## Проектке кірісу

Проекті өзіңіздің компьютеріңізде іске қосу үшін келесі қарапайым қадамдарды орындаңыз.

### Алғышарттар

Бұл жоба nodejs плафтормасын қолданады, сондықтан өзіңізге nodejs орнатыңыз. Және, бұл жоба деректер қоры ретінде
MongoDB-ны қолданады.

* node

  ```sh
  npm install npm@latest -g
  ```

### Орнату

1. [Cloudinary](https://cloudinary.com/) сайтына тіркеліп, API кілт алыңыз
2. Репоны көшіріңіз

   ```sh
   git clone https://github.com/nuromirzak/aqyndar.git
   ```

3. NPM пакеттерді орнатыңыз

   ```sh
   npm install
   ```

4. Қоршаған орта айнымалыларын (environment variables) `.env` файлына енгізіңіз

   ```dotenv
    MONGO_DB=# change to your mongodb url
    CLOUDINARY_CLOUD_NAME=# change to your cloudinary cloud name
    CLOUDINARY_KEY=# change to your cloudinary api key
    CLOUDINARY_SECRET=# change to your cloudinary secret
   ```

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

<!-- CONTRIBUTING -->

## Үлес қосу

Үлес қосу - open-source қоғамын үйренуге, шабыттануға, жаға идеялерға арналған таңғажайып орынға айналдырады. Кез келген
сіздің үлесіңіз **өте жоғары бағаланады**.

Егер сізде бұл проектті жақсартатын ұсыныс болса, репозиторийді өзіңізге көшіріп (fork), pull request ашыңыз. Сіз
сондай-ақ "issues" бетіне өтіп, өз ұсынысыңзы жіберсеңіз болады. Жобаға жұлдыз беруді ұмытпаңыз! Үлкен рахмет!

1. Проектті өзіңізге көшіріңіз (fork)
2. "Feature" тармағын ашыңыз (`git checkout -b feature/AmazingFeature`)
3. Өзгерістерді бекітіңіз (`git commit -m 'Add some AmazingFeature'`)
4. Тармаққа push жасаңыз (`git push origin feature/AmazingFeature`)
5. Pull Request ашыңыз

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

<!-- LICENSE -->

## Лицензия

MIT лицензиясы бойынша таратылады. Қосымша ақпарат үшін `LICENSE.txt` файлын ашыңыз.

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

<!-- CONTACT -->

## Контакттер

Nurmukhammed - [Linkedin][linkedin-url]

Жобаға сілтеме: [https://github.com/nuromirzak/aqyndar](https://github.com/nuromirzak/aqyndar)

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/nuromirzak/aqyndar.svg?style=for-the-badge

[contributors-url]: https://github.com/nuromirzak/aqyndar/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/nuromirzak/aqyndar.svg?style=for-the-badge

[forks-url]: https://github.com/nuromirzak/aqyndar/network/members

[stars-shield]: https://img.shields.io/github/stars/nuromirzak/aqyndar.svg?style=for-the-badge

[stars-url]: https://github.com/nuromirzak/aqyndar/stargazers

[issues-shield]: https://img.shields.io/github/issues/nuromirzak/aqyndar.svg?style=for-the-badge

[issues-url]: https://github.com/nuromirzak/aqyndar/issues

[license-shield]: https://img.shields.io/github/license/nuromirzak/aqyndar.svg?style=for-the-badge

[license-url]: https://github.com/nuromirzak/aqyndar/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/nurmukhammed

[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logoColor=white&logo=express

[Express-url]: https://expressjs.com/

[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white

[Mongo-url]: https://www.mongodb.com/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white

[Bootstrap-url]: https://getbootstrap.com
