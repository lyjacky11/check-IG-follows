// ==UserScript==
// @name         Check IG Follows
// @namespace    https://jackyly.ca/
// @version      1.0
// @description  Get list of followers and following on Instagram.
// @author       Jacky Ly
// @include      https://www.instagram.com/*
// @exclude      https://www.instagram.com/
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    let username = window.location.pathname.split("/")[1];
	let followers = [], followings = [], nonFollowings = [], nonFollowers = [];

	try {
      console.log("Username: " + username);

      let res = await fetch(`https://www.instagram.com/${username}/?__a=1`)
	  res = await res.json()
	  let userId = res.graphql.user.id

	  console.log("User ID: " + userId)

      console.log("Fetching followers... please wait!");

	  let after = null, has_next = true
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

	  console.log('Followers: ', followers)

      console.log("Fetching followings... please wait!");

	  has_next = true
	  after = null
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

	  console.log('Followings: ', followings)

      console.log("Calculating followers you're not following back... please wait!");
      for (var i = 0; i < followers.length; i++) {
            let currentUser = followers[i];
            let containsUser = followings.some(user => user.username === currentUser.username);
            if (!containsUser) {
                  nonFollowings.push(currentUser);
            }
      }
      console.log("Followers you're not following back (non-followings): ", nonFollowings);

      console.log("Calculating users that aren't following you back... please wait!");
      for (var j = 0; j < followings.length; j++) {
            let currentUser = followings[j];
            let containsUser = followers.some(user => user.username === currentUser.username);
            if (!containsUser) {
                  nonFollowers.push(currentUser);
            }
      }
      console.log("Followings that aren't following you back (non-followers): ", nonFollowers);
	}

	catch (err) {
	  // console.log('Invalid username!');
      console.log(err);
	}

})();
