/**
 * @author Santosh Mahto
 * @description index routes. it contain roots routes.
 * @listens MIT
 * @name index
 * @since 2017
 */

'use strict';

const fs = require('fs');
const Router = require('koa-router');
const router = new Router();

// importing router module
let info = require('./info');
let services = require('./services');
let products = require('./products');

// preparing routing pages.
const INDEX = 'pages/public/index';
const ABOUT = 'pages/public/about';
const CONTACT = 'pages/public/contact';
const TEAM = 'pages/public/team';
const EROOR404 = '404';
const FALLBACK = 'fallback';

// state
router.use(async (ctx, next) => {
  await next();
  ctx.state = ctx.state || {};
  ctx.state.now = new Date();
  ctx.state.ip = ctx.ip;
  ctx.state.version = '2.0.0';
});

// get data using middleware
let domain, tagLine;
router.use(async (ctx, next) => {
  await next()
  domain = ctx.domain;
  tagLine = process.env.TAG_LINE;
});

// loading the services
let serviceDetails = fs.readFile(
  'public/resources/services.json',
  'utf-8',
  (error, data) => {
    if (error) throw error;
    serviceDetails = JSON.parse(data);
  }
);

// loading the showcase
let showcaseDetails = fs.readFile(
  'public/resources/showcases.json',
  'utf-8',
  (error, data) => {
    if (error) throw error;
    showcaseDetails = JSON.parse(data);
  }
);

// dynamics data for apps
let welcomeSliders = new Array(); // home page welcome slider
let feedbackDetails = new Array(); // home page feedback details
// let showcaseDetails = new Array(); // showcase for home page
// let serviceDetails = new Array(); // services for home page
let teamPage = new Array(); // team page details
let teamSliders = new Array(); // team page sliders
let aboutPage = new Array(); // about page dynamics data

welcomeSliders = [
  {
    id: 0,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/home/sliders/slider1.jpg`,
    desktopAltText: `slider one for desktop`,
    mobileImage: `images/home/sliders/slider1.jpg`,
    mobileAltText: `slider one for mobile`,
  },
  {
    id: 1,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/home/sliders/slider2.jpg`,
    desktopAltText: `slider two for desktop`,
    mobileImage: `images/home/sliders/slider2.jpg`,
    mobileAltText: `slider two for mobile`,
  },
  {
    id: 2,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/home/sliders/slider3.jpg`,
    desktopAltText: `slider three for desktop`,
    mobileImage: `images/home/sliders/slider3.jpg`,
    mobileAltText: `slider three for mobile`,
  },
  {
    id: 3,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/home/sliders/slider1.jpg`,
    desktopAltText: `slider four for desktop`,
    mobileImage: `images/home/sliders/slider1.jpg`,
    mobileAltText: `slider four for mobile`,
  },
  {
    id: 4,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/home/sliders/slider2.jpg`,
    desktopAltText: `slider five for desktop`,
    mobileImage: `images/home/sliders/slider2.jpg`,
    mobileAltText: `slider five for mobile`,
  },
];

feedbackDetails = [
  {
    id: 0,
    name: 'bikash singh',
    imageUrl: 'images/home/feedback/pic1.png',
    imageAltText: 'bikash sing',
    designation: 'student',
    message:
      'I attended the workshop on IoT using NodeMcu in GIET University. It was a 2 day workshop which was completely based on practical implementation. We were taught with basics and all the equipment were given accordingly. We did no. of projects and learned a lot. The knowledge we acquire made us know the importance of practical work and we too analysed the difference between practical and theoretical knowledge.',
  },
  {
    id: 1,
    name: 'deepak agrawal',
    imageUrl: 'images/home/feedback/pic2.png',
    imageAltText: 'deepak agrawal',
    designation: 'student',
    message:
      'I am a student of science stream, as I do keep interest in electronics field so I attended a workshop organized by teckat. It was a workshop on AVR with Arduino. It was a 2 day workshop in which we learned about various things practically and all the kits were given as per the requirement. I felt happy technically to attend the workshop as it guided me about engineering.',
  },
  {
    id: 2,
    name: 'avinash aditya',
    imageUrl: 'images/home/feedback/pic3.png',
    imageAltText: 'avinash aditya',
    designation: 'student',
    message:
      'I am a student of Computer Science Department in GIET University. We had a workshop on basics of electronic devices repairing. It was a 10 days skill development workshop. Being a CSE student, I gained lots of knowledge on core part. We had a great experience in all.',
  },
  {
    id: 3,
    name: 'arti gupta',
    imageUrl: 'images/home/feedback/india.png',
    imageAltText: 'arti gupta',
    designation: 'student',
    message:
      'I am a student of ECE background. I got the opportunity to attend the workshop given by Teckat with my friends on Internet of Things. Overall, it was an awesome workshop as it the technical trainer were fabulous with their skills.',
  },
];

aboutPage = [
  {
    id: 'about-us-main',
    heading: 'about us',
    details: [
      {
        id: 'about-us',
        subHeading: 'about us',
        details: [
          'Our company provides best faculties for the workshop conduction in different fields to the students along with the components based on the requirement of workshop. We do respond to different institutions as per their area of interest  on which they want the workshop to be conducted. Students will be given complete knowledge so that they can implement it practically and go for various innovative projects.',
          'Apart from this, our company immediately contacts with the customers who are therefore in need once all the procedures are being done thereby to provide best services and help our customers in best manner.',
          'Also assures for the instant response to the customers as per the requirement.',
        ],
      },
      {
        id: 'our-vision',
        subHeading: 'our vision',
        details: [
          'To provide you with best ever services and reach to the students expectation and make them reliable in their field of interest through the medium of  workshops. To be the eye vision of students and nurture them at their initial stage to help them think about their future based on various fields.',
        ],
      },
      {
        id: 'how-we-works',
        subHeading: 'how we works',
        details: [
          'We work with many experienced trainers who will host and conduct the workshops as per the schedule with complete kit available with full of components required to gain the ideas and knowledge. In coming future, We would have an ultimate panel of electricians in various fields who will provide you complete package of work assigned to them and will give you the best solution until and unless the work is done. We also work on development of websites and mobile application.',
        ],
      },
    ],
  },
  {
    id: 'know-more',
    heading: 'know More',
    details: [
      {
        id: 'why-choose-us',
        subHeading: 'Why Choose Us',
        details: [
          'Best trainers are provided for the workshop to be conducted. Training kit will be provided to the students depending on the workshop. Best ever services will be given to the customers with the assurance of the work being done on time.',
        ],
      },
      {
        id: 'our-mission',
        subHeading: 'Our Mission',
        details: [
          'To provide you with best ever services and reach to the students expectation and make them reliable in their field of interest through workshops. To be the eye vision of students and nurture them at their initial stage to help them think about their future based on various fields.',
        ],
      },
      {
        id: 'what-you-get',
        subHeading: 'What You Get',
        details: [
          'You will get complete facilities regarding services required. Offers and discounts will be intimated to you. In case there is an emergency, we will definitely reach you as soon as possible. Ultimately, we guarantee you optimal satisfaction.',
        ],
      },
    ],
  },
];

teamPage = [
  {
    id: 0,
    name: 'pritam kundu',
    designation: 'ceo',
    imageUrl: 'images/team/members/pritamkundu.jpg',
    imageAltText: 'pritam kundu',
    facebook: 'https://www.facebook.com/pritam.kundu.148/',
    twitter: 'http://twitter.com/',
    instagram: 'https://www.instagram.com/ppritamkundu/',
  },
  {
    id: 1,
    name: 'sanjeev gope',
    designation: 'ui/ux designer',
    imageUrl: 'images/team/members/sanjeevgope.jpg',
    imageAltText: 'sanjeev gope',
    facebook: 'https://www.facebook.com/',
    twitter: 'http://twitter.com/',
    instagram: 'https://www.instagram.com/',
  },
  {
    id: 2,
    name: 'sandeep',
    designation: 'cmo',
    imageUrl: 'images/team/members/sandeep.jpg',
    imageAltText: 'sandeep',
    facebook: 'https://www.facebook.com/sandeep.chatterjee.731/',
    twitter: 'http://twitter.com/',
    instagram: 'https://www.instagram.com/',
  },
  {
    id: 3,
    name: 'santosh mahto',
    designation: 'cto',
    imageUrl: 'images/team/members/insantoshmahto.jpg',
    imageAltText: 'santosh mahto',
    facebook: 'https://www.facebook.com/insantoshmahto/',
    twitter: 'https://twitter.com/santoshmahto_in/',
    instagram: 'https://www.instagram.com/insantoshmahto/',
  },
  {
    id: 4,
    name: 'gaurav',
    designation: 'trainer',
    imageUrl: 'images/team/members/gaurav.jpg',
    imageAltText: 'sanjeev gope',
    facebook: 'https://www.facebook.com/',
    twitter: 'http://twitter.com/',
    instagram: 'https://www.instagram.com/',
  },
  {
    id: 5,
    name: 'maybe you',
    designation: 'your dream',
    imageUrl: 'images/team/members/maybe.jpg',
    imageAltText: 'maybe you',
    facebook: 'https://www.facebook.com/',
    twitter: 'http://twitter.com/',
    instagram: 'https://www.instagram.com/',
  },
];

teamSliders = [
  {
    id: 0,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/team/sliders/slider1.jpg`,
    desktopAltText: `slider one for desktop`,
    mobileImage: `images/team/sliders/slider1.jpg`,
    mobileAltText: `slider one for mobile`,
  },
  {
    id: 1,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/team/sliders/slider2.jpg`,
    desktopAltText: `slider two for desktop`,
    mobileImage: `images/team/sliders/slider2.jpg`,
    mobileAltText: `slider two for mobile`,
  },
  {
    id: 2,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/team/sliders/slider3.jpg`,
    desktopAltText: `slider three for desktop`,
    mobileImage: `images/team/sliders/slider3.jpg`,
    mobileAltText: `slider three for mobile`,
  },
  {
    id: 3,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/team/sliders/slider1.jpg`,
    desktopAltText: `slider four for desktop`,
    mobileImage: `images/team/sliders/slider1.jpg`,
    mobileAltText: `slider four for mobile`,
  },
  {
    id: 4,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/team/sliders/slider2.jpg`,
    desktopAltText: `slider five for desktop`,
    mobileImage: `images/team/sliders/slider2.jpg`,
    mobileAltText: `slider five for mobile`,
  },
  {
    id: 5,
    heading: 'teckat',
    content: `A pace towards dynamic tomorrow`,
    desktopImage: `images/team/sliders/slider3.jpg`,
    desktopAltText: `slider five for desktop`,
    mobileImage: `images/team/sliders/slider3.jpg`,
    mobileAltText: `slider five for mobile`,
  },
];

/* ===============================================================
------------------------Root routing------------------------------
=================================================================== */

// Home page
router.get('/', async ctx => {
  await ctx.render(INDEX, {
    domain: domain,
    heading: 'home',
    tagLine: tagLine,
    introduction: 'empty',
    welcomeSliders: welcomeSliders,
    serviceDetails: serviceDetails,
    feedbackDetails: feedbackDetails,
    showcaseDetails: showcaseDetails,
    teamDetails: teamPage,
    title: `Teckat | ${tagLine}`,
  });
});

// contact page
router.get('/contact', async ctx => {
  await ctx.render(CONTACT, {
    domain: domain,
    heading: 'contact us',
    tagLine: tagLine,
    introduction:
      'God doesn’t comfort us to make us comfortable, but to make us comforters.',
    title: `Contact | Teckat | ${tagLine}`,
  });
});

// about page
router.get('/about', async ctx => {
  await ctx.render(ABOUT, {
    domain: domain,
    heading: 'about us',
    tagLine: tagLine,
    introduction:
      'Our Uniqueness, Our Individuality, and Our Life Experience molds us into fascinating beings',
    aboutUs: aboutPage[0],
    knowMore: aboutPage[1],
    title: `About | Teckat | ${tagLine}`,
  });
});

// team page
router.get('/team', async ctx => {
  await ctx.render(TEAM, {
    domain: domain,
    heading: 'our team',
    tagLine: tagLine,
    introduction: 'empty',
    teamDetails: teamPage,
    teamSliders: teamSliders,
    title: `Team | Teckat | ${tagLine}`,
  });
});

// fallback page
router.get('/fallback', async ctx => {
  await ctx.render(FALLBACK, {
    domain: domain,
    heading: 'Offline',
    tagLine: tagLine,
    introduction: 'This Page Is Not Available At Offline Mode. To Access This Page Make Sure Your Conencted With Internet.',
    title: `Offline | Teckat | ${tagLine}`,
  });
});

// services page
router.use(info.routes())
  .use(info.allowedMethods());

// services page
router.use(services.routes())
  .use(services.allowedMethods());

// products page
router.use(products.routes())
  .use(products.allowedMethods());

// GET 404 page.
router.get('/*', async ctx => {
  await ctx.render(EROOR404, {
    domain: domain,
    heading: 'file not found',
    tagLine: tagLine,
    introduction: 'empty',
    title: `Error | 404 | File Not Found | Teckat | ${tagLine}`,
  });
});

module.exports = router;
