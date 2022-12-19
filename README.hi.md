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

[![Contributors][contributors-shield]][contributors-url][![Forks][forks-shield]][forks-url][![Stargazers][stars-shield]][stars-url][![Issues][issues-shield]][issues-url][![MIT License][license-shield]][license-url][![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <a href="https://github.com/nuromirzak/aqyndar">
    <img src="./public/icons/android-chrome-192x192.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Aqyndar</h3>

  <p align="center">
    Қазақстан жазушыларының және ақындарының поэемаларын түсінікті тілде жеткізу
    <br />
        <a href="https://github.com/nuromirzak/aqyndar"><strong>Документацияны оқу »</strong></a>
    <br />
    <br />
    <a href="https://aqyndar.herokuapp.com/">Сайтты ашу</a>
    ·
    <a href="https://github.com/nuromirzak/aqyndar/issues">Қате туралы хабарлау</a>
    ·
    <a href="https://github.com/nuromirzak/aqyndar/issues">Өзгеріс ұсыну</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Мазмұн</summary>
  <ol>
    <li>
      <a href="#жоба-туралы">About The Project</a>
      <ul>
        <li><a href="#қолданылған-құралдар">Қолданылған құралдар</a></li>
      </ul>
    </li>
    <li>
      <a href="#проектке-кірісу">Проектке кірісу</a>
      <ul>
        <li><a href="#алғышарттар">Алғышарттар</a></li>
        <li><a href="#орнату">Орнату</a></li>
      </ul>
    </li>
    <li><a href="#үлесқосу">Үлес қосу</a></li>
    <li><a href="#лицензия">Лицензия</a></li>
    <li><a href="#контакттер">Контакттер</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## परियोजना के बारे में

<table>
  <tr>
    <td valign="top" colspan="2"><img src="./public/images/screenshot_1.png"/></td>
  </tr>
  <tr>
    <td valign="top"><img src="./public/images/screenshot_2.png"/></td>
    <td valign="top"><img src="./public/images/screenshot_3.png"/></td>
  </tr>
</table>

इस वेबसाइट का उद्देश्य कज़ाख लेखकों और कवियों की कविताओं को समझने योग्य भाषा में जनता तक पहुँचाना है। यह
परियोजना क्राउडसोर्सिंग के सिद्धांतों पर आधारित है। लोग स्वेच्छा से साइट पर कविताओं/टिप्पणियों का योगदान करते हैं।

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

### उपकरणों का इस्तेमाल

-   [![Express][Express.js]][Express-url]
-   [![Mongo][MongoDB]][Mongo-url]
-   [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

<!-- GETTING STARTED -->

## प्रोजेक्ट के साथ शुरुआत करना

प्रोजेक्ट को अपने कंप्यूटर पर चलाने के लिए इन सरल चरणों का पालन करें।

### आवश्यक शर्तें

यह प्रोजेक्ट नोडज प्लेटफॉर्म का उपयोग करता है, इसलिए कृपया स्वयं नोडज स्थापित करें। और, यह परियोजना एक डेटाबेस के रूप में
मोंगोडीबी का उपयोग करता है।

-   नोड
    ```sh
    npm install npm@latest -g
    ```

### इंस्टालेशन

1.  [Cloudinary](https://cloudinary.com/)साइट पर रजिस्टर करें और एक एपीआई कुंजी प्राप्त करें
2.  रेपो कॉपी करें
    ```sh
    git clone https://github.com/nuromirzak/aqyndar.git
    ```
3.  एनपीएम पैकेज स्थापित करें
    ```sh
    npm install
    ```
4.  पर्यावरण चर`.env`फ़ाइल में दर्ज करें
    ```dotenv
     MONGO_DB=# change to your mongodb url
     CLOUDINARY_CLOUD_NAME=# change to your cloudinary cloud name
     CLOUDINARY_KEY=# change to your cloudinary api key
     CLOUDINARY_SECRET=# change to your cloudinary secret
    ```

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

<!-- CONTRIBUTING -->

## योगदान जोड़ें

योगदान करने से ओपन-सोर्स समुदाय सीखने, प्रेरित होने और नए विचारों के साथ आने के लिए एक अद्भुत जगह बन जाता है। कोई भी
आप का योगदान**अत्यधिक सराहना की**.

यदि आपके पास इस परियोजना को बेहतर बनाने का कोई सुझाव है, तो कृपया रिपॉजिटरी को फोर्क करें और एक पुल अनुरोध खोलें। आप
आप "मुद्दों" पृष्ठ पर भी जा सकते हैं और अपने सुझाव सबमिट कर सकते हैं। प्रोजेक्ट को तारांकित करना न भूलें! आपका बहुत-बहुत धन्यवाद!

1.  Проектті өзіңізге көшіріңіз (fork)
2.  "Feature" тармағын ашыңыз (`git checkout -b feature/AmazingFeature`)
3.  प्रतिबद्ध बदलाव (`git commit -m 'Add some AmazingFeature'`)
4.  शाखा धक्का (`git push origin feature/AmazingFeature`)
5.  पुल अनुरोध खोलें

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

<!-- LICENSE -->

## लाइसेंस

एमआईटी लाइसेंस के तहत वितरित। अधिक जानकारी के लिए`LICENSE.txt`फ़ाइल खोलें।

<p align="right">(<a href="#top">жоңарыға көтерілу</a>)</p>

<!-- CONTACT -->

## संपर्क

नूरमुखम्मद -[Linkedin][linkedin-url]

परियोजना से लिंक करें:[हत्तपः://गिटहब.कॉम/नुरोमिरज़ाक/ाकिंदर](https://github.com/nuromirzak/aqyndar)

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

[product-screenshot]: ./public/images/screenshot_1.png

[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logoColor=white&logo=express

[Express-url]: https://expressjs.com/

[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white

[Mongo-url]: https://www.mongodb.com/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white

[Bootstrap-url]: https://getbootstrap.com
