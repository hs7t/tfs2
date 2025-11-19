# Tubip Fabrication Simulator N.T.

Tubip Fabrication Simulator (New Technology)
is a tiny browser game about fabricating and selling 'tubip',
a make-believe commodity.

## Playing

- Hit the big 'Fabricate' button and fabricate some tubip!
- Fabrication requires matter. You'll get some every so often.
- Check your stats to admire your simulation domination progress.
- Keep an eye on the news ticker! News events can influence factors like
  exchange rates and prices.
- Sell your tubip for CU, and use them to buy power-ups using the Purchase
  button!

## Tech used

- [SvelteKit](https://kit.svelte.dev/) and
  [adapter-static](https://svelte.dev/docs/kit/adapter-static)
- [Prettier](https://prettier.dev/) and
  [TypeScript](https://www.typescriptlang.org/)

### And more!

- [Ryan Mulligan](https://ryanmulligan.dev/)'s [awesome guide](https://ryanmulligan.dev/blog/css-marquee/) on designing CSS-based marquees
- [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/), for inspiration

## Running this yourself

1.  Clone this repo, and install all the necessary dependencies:
    ```bash
    $ git clone https://github.com/hs7t/hviicc.git
    $ npm i
    ```
2.  Run a development server:

    ```bash
    $ npm run dev
    ```

3.  Get a build when you're ready:
    ```bash
    npm run build   # check out ./dist afterward!
    ```

There's a GitHub Pages workflow available at [`.github/workflows`](./.github/pages).
No back-end is necessary - the distribution build is fully static.

## About

This project was initially made for week 11 of Hack Club's
[Siege](https://siege.hackclub.com/)! It's an overdue rewrite of
[Tubip Fabrication Simulator](https://github.com/hs7t/tubip-fabrication-simulator),
with a new, prettier UI, SvelteKit instead of Svelte, and a
better core with support for fancier features and events.
