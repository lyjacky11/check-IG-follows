// ==UserScript==
// @name         Check IG Follows
// @namespace    https://jackyly.ca/
// @version      2.00
// @description  Get list of followers and following on Instagram.
// @author       Jacky Ly
// @include      https://www.instagram.com/*
// @exclude      https://www.instagram.com/
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    console.log("%cCheck IG Follows written by: Jacky Ly", "color: orange");

    let username = window.location.pathname.split("/")[1];
	let followers = [], followings = [], nonFollowings = [], nonFollowers = [];

	try {
      console.log("%cUsername: %s", "color: springgreen", username);

      let res = await fetch(`https://www.instagram.com/${username}/?__a=1`);
	  res = await res.json();
	  let userId = res.graphql.user.id;

	  console.log("%cUser ID: %s", "color: springgreen", userId);

      console.log("%cFetching followers... please wait!", "color: aqua");

	  let after = null, has_next = true;
	  while (has_next) {
		await fetch(`https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` + encodeURIComponent(JSON.stringify({
		  id: userId,
		  include_reel: true,
		  fetch_mutual: true,
		  first: 50,
		  after: after
		}))).then(res => res.json()).then(res => {
		  has_next = res.data.user.edge_followed_by.page_info.has_next_page
		  after = res.data.user.edge_followed_by.page_info.end_cursor
		  followers = followers.concat(res.data.user.edge_followed_by.edges.map(({node}) => {
			return {
			  username: node.username,
			  full_name: node.full_name
			}
		  }))
		})
	  }
      console.log("%cFollowers Count: %s", "color: yellow", followers.length);
	  console.log("%cFollowers: %s", "color: yellow", JSON.stringify(followers));

      console.log("%c%s", "color: aqua", "Fetching followings... please wait!");

	  has_next = true;
	  after = null;
	  while (has_next) {
		await fetch(`https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=` + encodeURIComponent(JSON.stringify({
		  id: userId,
		  include_reel: true,
		  fetch_mutual: true,
		  first: 50,
		  after: after
		}))).then(res => res.json()).then(res => {
		  has_next = res.data.user.edge_follow.page_info.has_next_page
		  after = res.data.user.edge_follow.page_info.end_cursor
		  followings = followings.concat(res.data.user.edge_follow.edges.map(({node}) => {
			return {
			  username: node.username,
			  full_name: node.full_name
			}
		  }))
		})
	  }
      console.log("%cFollowings Count: %s", "color: yellow", followings.length);
	  console.log('%cFollowings: %s', "color: yellow", JSON.stringify(followings));

      console.log("%cCalculating users that you're not following back... please wait!", "color: aqua");
      for (var i = 0; i < followers.length; i++) {
            let currentUser = followers[i];
            let containsUser = followings.some(user => user.username === currentUser.username);
            if (!containsUser) {
                  nonFollowings.push(currentUser);
            }
      }
      console.log("%cNon-Followings Count: %s", "color: yellow", nonFollowings.length);
      console.log("%cNon-Followings (users you're not following back): %s", "color: yellow", JSON.stringify(nonFollowings));

      console.log("%cCalculating users that aren't following you back... please wait!", "color: aqua");
      for (var j = 0; j < followings.length; j++) {
            let currentUser = followings[j];
            let containsUser = followers.some(user => user.username === currentUser.username);
            if (!containsUser) {
                  nonFollowers.push(currentUser);
            }
      }
      console.log("%cNon-Followers Count: %s", "color: yellow", nonFollowers.length);
      console.log("%cNon-Followers (users aren't following you back): %s", "color: yellow", JSON.stringify(nonFollowers));
	}

	catch (err) {
      console.error(err);
	}

})();
