## clean up components | Priority 1
- messages should be a component ✅
- messageInput should be a component ✅
- fix organization of the settings page.... yikes ✅
- fix organization of the match page.... yikes
- reorganize a little

## match page
 - state needs to live at the top
 - filter needs to go through state
 - only pass down the list to be rendered

## Organize css | Priority 2
 - more files everywhere ✅
 - add responsive queries

## add startup / investr profile view along side the chat | Priority 3
  - little sidebar with picture
  - name
  - info about the profile
  - that's all!

## make startup likes persist && render that way | Priority 4
  - did a sort of conditional render with the like stamp ✅
  - probably already close? check schema and what request (if any) is being sent off
  - toggles in state

## better authorization / authentication | Priority 5 ✅
- implement with JWT and localStorage ✅
- auth on the backend
- creating a user should immediately log them in
- clean up login form MAJORLY

## Keep working on the adapter | Priority 5 ✅
 - what endpoints need to be exposed?
 - how can we clean up more with auth?
 - move all fetches into adapters

## add a note to click on an avatar on message window | Priority 6
 - message window totally blank without a conversation select

## messaging should allow for emoji keyboard | Priority 7
 - not sure yet
