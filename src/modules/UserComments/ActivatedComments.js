import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { fontAlphaHeadline, fontFamilies } from '../../typography';
import * as colors from '../../colors';
import * as breakpoints from '../../breakpoints';
import ScriptInjector from '../../components/ScriptInjector';
import Spinner from '../../elements/Spinner';

const StyledHeader = styled.div`
  font-size: 12px;
  ${fontAlphaHeadline};
  text-transform: capitalize;
  color: ${colors.coreLightMinus1};
  padding: 24px 0;
  border-top: 1px solid ${colors.coreNeutral4};
  border-bottom: 1px solid ${colors.coreNeutral4};
  margin-bottom: 30px;

  ${breakpoints.medium(css`
    font-size: 16px;
  `)};
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: nowrap row;
  align-content: flex-start;
`;

const StyledComments = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
`;
const StyledAdvertisement = styled.div`
  display: none;

  ${breakpoints.wide(css`
    display: block;
    flex-grow: 1;
    flex-shrink: 0;
    padding: 0 50px;
    width: 300px;
  `)};
`;

const StyledFooter = styled.a`
  display: block;
  font-size: 12px;
  ${fontAlphaHeadline};
  color: ${colors.coreLightMinus1};
  text-align: right;
  margin-top: 15px;
  text-decoration: none;

  ${breakpoints.medium(css`
    font-size: 14px;
  `)};
`;

export const StyledSpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSpinner = styled(Spinner)`
  svg {
    position: relative;
    z-index: 2;
  }
`;

export const StyledContentCss = () => (
  <style
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `
.fyre-stream-stats {
	display: none !important
}

.fyre .fyre-login-bar {
	position: relative !important;
	height: auto !important;
	width: 50% !important
}

.fyre-width-medium .fyre-box-wrapper {
	max-width: 100% !important;
	position: relative !important
}

.fyre .fyre-box-wrapper span.fyre-user-drop {
	font-size: 14px !important;
  font-family: ${fontFamilies.helvetica} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
}

.fyre .fyre-live-container {
	display: none !important;
	visibility: hidden !important;
	margin: 10px 0 !important
}

.fyre .fyre-editor {
	clear: both !important
}

.fyre-editor .fyre-editor-container .fyre-editor-editable {
	padding: 10px !important;
	height: 107px !important;
	font-size: 14px !important; 
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	line-height: 24px;
}

.fyre-editor .fyre-editor-toolbar {
  display: inline-block !important;
  height: auto !important;
	margin-top: 30px !important;
	text-align: center !important;
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-toolbar-separator {
	border-left: 0px solid ${colors.geyser} !important
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block,
.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block.fyre-post-button-new {
	border-right: 0px solid ${colors.geyser} !important;
	border-bottom: 0px solid ${colors.geyser} !important
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block .fyre-button-right-inner-box {
	color: ${colors.coreNeutral4} !important;
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block .fyre-button-right-inner-box:hover {
	color: ${colors.coreLightMinus1} !important;
}

.fyre .fyre-comment-stream {
	margin-top: 0 !important;
}

a.fyre-stream-sort-top-comments {
	display: inline !important;
}

.fyre-stream-content-not-found {
	font-size: 14px !important; 
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
}

.fyre .fyre-stream-more {
	background: none !important;
}

.fyre .fyre-comment-wrapper {
	position: relative !important;
	padding: 23px 0 !important;
}

.fyre .fyre-comment-user,
.fyre .fyre-comment-source-0 .fyre-comment-user {
	top: 18px !important;
}

.fyre .fyre-comment-user img.fyre-user-avatar,
.fyre.fyre-width-small .fyre-comment-container .fyre-comment-replies-indent img.fyre-user-avatar {
	height: 47px !important;
	width: 47px !important;
	margin-right: 10px !important;
}

.fyre .fyre-comment-wrapper time.fyre-comment-date {
	float: none !important;
	display: inline !important;
	font-size: 12px !important; 
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	color: ${colors.turquoiseBlue} !important;
}

.fyre .fyre-comment-wrapper time.fyre-comment-date::before {
	content: '-';
	margin: 0 5px 0 3px;
}

.fyre .fyre-comment {
	margin-top: 15px !important;
}

.fyre-comment-wrapper .fyre-comment p a {
	font-weight: normal !important;
}

.fyre .fyre-comment-head,
.fyre .fyre-comment-body {
	margin-left: 60px !important;
}

.fyre .fyre-comment-footer {
	margin: 0 !important;
}

.fyre .fyre-comment-reply {
	margin-left : 20px !important;
}

.fyre .fyre-comment-reply,
.fyre .fyre-comment-like {
	top: 0 !important;
}

.fyre .fyre-comment-actions {
	margin-top: -2px !important;
}

.fyre .fyre-comment-actions a.fyre-flag-link{
	display: none !important;
}

.fyre .fyre-comment-divider {
	margin: 0 !important;
}

.fyre .fyre-comment-divider>div.fyre-comment-divider {
	margin: 0 0 0 23px !important;
}

.fyre .fyre-comment-divider>span.fyre-comment-reply-wrapper {
	top: -8px !important;
}

.fyre .fyre-comment-divider .fyre-comment-reply-count {
	margin: 0 4px 0 5px !important;
}

.fyre .fyre-featured-content-wrapper {
	min-width: 0 !important;
}

.fyre-featured-title {
	font-size: 11px !important;
  font-family: ${fontFamilies.helvetica} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	color: ${colors.paleSky} !important;
}

.fyre .fyre-featured-content-wrapper .fyre-featured-header-icon {
	display: none !important;
}

.fyre .fyre-featured-content-wrapper .fyre-featured-header {
	border-bottom: 0px !important;
	height: 20px !important;
	text-transform: uppercase !important;
}

.fyre .fyre-featured-content-wrapper .fyre-featured-body:before {
	content: "";
	background: url("https://layout.eurosport.com/i/v8/livefyre/pin.png") no-repeat transparent !important;
	width: 15px !important;
	height: 15px !important;
	position: absolute !important;
	left: 0px !important;
	top: 35px !important;
}

.fyre .fyre-featured-content-wrapper .fyre-featured-body {
	border: 1px solid ${colors.coreNeutral4} !important;
	border-left: 5px solid ${colors.coreNeutral4} !important;
	padding: 15px !important;
	margin-left: 30px !important;
	width: auto !important;
}

.fyre .fyre-featured-content-wrapper .fyre-featured-quote {
	display: none !important;
}

.fyre .fyre-featured-content-wrapper .fyre-comment-wrapper {
	padding-top: 0px !important;
	font-size: 18px !important;
  font-family: ${fontFamilies.helvetica} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	color: ${colors.coreNeutral4} !important;
}

.fyre .fyre-featured-content-wrapper .fyre-comment-divider {
	display: none !important;
}

.fyre .fyre-featured-content-wrapper .fyre-featured-authored-by {
	font-size: 12px !important;
  font-family: ${fontFamilies.helvetica} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	color: ${colors.paleSky} !important;
}

.fyre .fyre-featured-content-wrapper .fyre-circle-separator {
	background-color: ${colors.paleSky} !important;
	margin-left: 2px !important;
}

.fyre .fyre-featured-content-wrapper .fyre-featured-author .fyre-comment-username {
	font-size: 14px !important;
  font-family: ${fontFamilies.helvetica} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	color: ${colors.coreLightMinus1} !important;
}

.fyre .fyre-featured-content-wrapper .fyre-featured-author .fyre-comment-date {
	color: ${colors.paleSky} !important;
}

.fyre .fyre-featured-icon {
	display: none !important;
}

.fyre .fyre-comment-tag.fyre-featured {
	background: none !important;
}

.fyre .fyre-comment-tag.fyre-featured .fyre-featured-text {
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	-webkit-border-radius: 2px;
	-moz-border-radius: 2px;
	-ms-border-radius: 2px;
	-o-border-radius: 2px;
	border-radius: 2px;
	padding: 4px 8px !important;
	background-color: ${colors.coreLightMinus1} !important;
	color: ${colors.blackPearl} !important;
	margin: 0 !important;
	font-size: 12px !important;
	font-weight: bold !important;
}

.fyre-stream-stats .fyre-comment-count {
	display: none !important;
}

.fyre-stream-stats .fyre-help {
	display: none !important;
}

.fyre-auth {
	margin: 0px !important;
}

.fyre .fyre-user-loggedin {
	cursor: initial !important;
}

.fyre-auth .fyre-login-bar,
.fyre .fyre-auth .fyre-login-bar a {
	font-size: 14px !important; 
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	font-weight: bold !important;
	margin: 0px !important;
	color: ${colors.coreLightMinus1} !important;
	text-transform: capitalize;
	line-height:40px;
}

.fyre .fyre-auth .fyre-login-bar a span{
	margin-left: 14px;
}

.fyre .fyre-box-wrapper {
	border: 0px !important;
	position: relative;
}

.fyre-user-profile-link,
.fyre-comment-username,
.!ifyre-mention {
	cursor: default !important
}

.fyre-user-profile-link img {
	margin-top: -3px;
	-webkit-border-radius: 50% !important;
	-moz-border-radius: 50% !important;
	-ms-border-radius: 50% !important;
	-o-border-radius: 50% !important;
	border-radius: 50% !important;
	height: 50px !important;
	width: 50px !important;
}

.fyre .fyre-box-wrapper span.fyre-user-drop {
	background: none !important;
	color: ${colors.arsenic} !important;
	font-size: 14px !important;
	font-weight: bold !important;
  font-family: ${fontFamilies.helvetica} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
}

.fyre .fyre-box-wrapper:hover,
.fyre .fyre-box-wrapper.fyre-box-mobile-touch {
	background: none !important;
	border: 0px !important;
	-webkit-border-radius: 0px !important;
	-moz-border-radius: 0px !important;
	-ms-border-radius: 0px !important;
	-o-border-radius: 0px !important;
	border-radius: 0px !important;
	-webkit-box-shadow: none !important;
	-moz-box-shadow: none !important;
	-ms-box-shadow: none !important;
	-o-box-shadow: none !important;
	box-shadow: none !important
}

.fyre .fyre-box-wrapper:hover .fyre-box-list,
.fyre .fyre-box-wrapper.fyre-box-mobile-touch .fyre-box-list {
	display: none !important
}

.fyre-editor {
	margin-top: 30px !important;
	-webkit-font-smoothing: antialiased !important
}

.fyre-editor .fyre-editor-editable {
	font-size: 16px !important;
	font-family: ${fontFamilies.interUi} !important;
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  font-smooth: auto;
	line-height: 24px !important;
	color: ${colors.arsenic} !important;
	border: 1px solid ${colors.arsenic} !important;
	background-color: ${colors.coreLightMinus1} !important;
	-webkit-border-radius: 2px !important;
	-moz-border-radius: 2px !important;
	-ms-border-radius: 2px !important;
	-o-border-radius: 2px !important;
	border-radius: 2px !important;
	-webkit-box-shadow: none !important;
	-moz-box-shadow: none !important;
	-ms-box-shadow: none !important;
	-o-box-shadow: none !important;
	box-shadow: none !important;
	height: 90px !important
}

.fyre-editor .fyre-editor-editable:hover {
	cursor: text !important
}

.fyre-editor .fyre-editor-error {
	display: none !important;
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>div.fyre-mention-button>div {
	background: url("https://layout.eurosport.com/i/v8_5/livefyre/sprite2.png") 9px -57px no-repeat !important
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>div.fyre-mention-button.fyre-button-left-open>div {
	background: url("https://layout.eurosport.com/i/v8_5/livefyre/sprite2.png") 9px -89px no-repeat !important
}

.fyre-mention,
.fyre-mention span{
	font-size: 14px !important;
  font-family: ${fontFamilies.interUi} !important;
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  font-smooth: auto;
	font-weight: bold !important;
	text-transform: capitalize !important;
}

.fyre-mention-menu {
	left: 1px !important;
	border: 1px solid ${colors.coreNeutral4} !important;
	border-top: 0px !important
}

.fyre-mention-menu .fyre-mention-item span {
	display: none !important
}

.fyre-mention-menu .fyre-mention-item {
	height: 30px !important
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>div.fyre-button-left.fyre-format-button {
	display: none !important
}

.fyre-editor .fyre-editor-toolbar .fyre-share-button {
	width: 100px !important;
	display: none !important
}

.fyre-editor .fyre-editor-toolbar .fyre-share-button .fyre-button-right-inner-box {
	background-image: none !important;
	text-align: center !important;
	padding: 0px !important
}

.fyre-editor .fyre-editor-toolbar .fyre-share-container {
	border: 1px solid ${colors.coreNeutral4} !important;
	border-top: 0px !important
}

.fyre-editor .fyre-editor-toolbar .fyre-share-container>span {
	background-image: none !important
}

.fyre-editor .fyre-editor-toolbar .fyre-share-container>span.fyre-editor-share-twitter span {
	background-position: 0px 16px !important
}

.fyre-editor .fyre-editor-toolbar .fyre-share-container>span.fyre-editor-share-facebook span {
	background-position: -32px 16px !important
}

.fyre-editor .fyre-editor-toolbar .fyre-share-container>span.fyre-editor-share-linkedin span {
	background-position: -16px 16px !important
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block {
	display: none !important;
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-toolbar-separator {
	border-left: 1px solid ${colors.geyser} !important
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.fyre-mention-button {
	border-left: 1px solid ${colors.geyser} !important
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block .fyre-button-left-inner-box:hover,
.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block .fyre-button-right-inner-box:hover {
	color: inherit !important;
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>div.fyre-mention-button>div:hover {
	background: url("https://layout.eurosport.com/i/v8_5/livefyre/sprite2.png") 9px -89px no-repeat !important
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block.fyre-post-button-new,
.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block.fyre-post-button-reply {
  border: 1px solid ${colors.coreNeutral4} !important;
	border-radius: 0px !important;
	display: block !important;
	background-color: transparent !important;
	background-image: none !important;
	padding: 13px 20px !important;
	height: auto !important;
	color: ${colors.coreNeutral4} !important;
}

.fyre-user-authenticated .fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block.fyre-post-button-new,
.fyre-user-authenticated .fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block.fyre-post-button-reply {
  border: 1px solid ${colors.coreLightMinus1} !important;
	color: ${colors.coreLightMinus1} !important;
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block.fyre-post-button-new:hover,
.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block.fyre-post-button-reply:hover {
  border: 1px solid ${colors.coreLightMinus1} !important;
	color: ${colors.coreLightMinus1} !important;
}

.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block .fyre-button-left-inner-box,
.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block .fyre-button-right-inner-box {
	font-size: 12px !important;
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	font-weight: normal !important;
	color: inherit !important;
	text-shadow: none !important;
	text-transform: uppercase !important;
}

.fyre-provider-connections {
	display: none !important
}

.fyre-stream-sort {
	padding-bottom: 5px !important;
	text-align: center  !important;
	border-bottom: 1px solid ${colors.coreNeutral4} !important;
}

.fyre-stream-sort .fyre-stream-sort-bar {
	margin: 0 2px !important
}

.fyre-stream-sort .fyre-stream-sort-options a {
	font-size: 12px !important;
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	color: ${colors.coreNeutral4} !important;
}

.fyre-stream-sort .fyre-stream-sort-options a:hover,
.fyre-stream-sort .fyre-stream-sort-options a.fyre-stream-sort-selected {
	color: ${colors.coreLightMinus1} !important
}

.fyre-comment-stream {
	text-align: center !important
}

.fyre-comment-wrapper .fyre-comment-username {
	font-size: 14px !important;
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	color: ${colors.coreLightMinus1} !important; 
	font-weight: bold !important;
	text-transform: capitalize !important;
}

.fyre-comment-wrapper .fyre-comment-date {
	font: 11px Arial, Cambria, sans-serif !important;
	color: ${colors.turquoiseBlue} !important
}

.fyre .fyre-comment-user img.fyre-user-avatar {
	-webkit-border-radius: 50% !important;
	-moz-border-radius: 50% !important;
	-ms-border-radius: 50% !important;
	-o-border-radius: 50% !important;
	border-radius: 50% !important;
	cursor: default !important
}

.fyre.fyre-width-small .fyre-comment-container .fyre-comment-replies-indent img.fyre-user-avatar {
	-webkit-border-radius: 50% !important;
	-moz-border-radius: 50% !important;
	-ms-border-radius: 50% !important;
	-o-border-radius: 50% !important;
	border-radius: 50% !important;
	height: 47px !important;
	width: 47px !important
}

.fyre .fyre-comment-author-tag {
	display: inline !important;
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	padding: 4px !important;
	background-color: ${colors.coreNeutral4} !important
}

.fyre .fyre-moderator {
	display: none !important
}

.fyre-comment-wrapper .fyre-comment p,
.fyre-comment-wrapper .fyre-comment p a {
	font-size: 14px !important;
  font-family: ${fontFamilies.interUi} !important;
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  font-smooth: auto;
  color: ${colors.coreLightMinus1} !important;
	line-height: 24px !important;
	font-weight: normal !important;
}

.fyre-comment-wrapper .fyre-comment p a {
	font-weight: bold !important;
	cursor: default !important;
}

.fyre-comment-wrapper .fyre-comment-footer a:hover {
	text-decoration: none !important;
	opacity: 0.7 !important;
}

.fyre-comment-divider .fyre-comment-reply-wrapper {
	font: 11px Arial, "Open Sans", sans-serif !important;
	color: ${colors.turquoiseBlue} !important;
	margin: 0 0 0 60px !important;
	background-color: ${colors.blackPearl} !important;
	padding: 3px 6px 3px 3px !important;
}

.fyre-comment-divider .fyre-comment-reply-wrapper:hover {
	opacity: 0.9 !important;
}

.fyre-comment-divider .fyre-comment-reply-wrapper .fyre-comment-reply-count {
	background-image: none !important;
	border: 0px !important;
	width: auto !important;
}

.fyre-comment-divider .fyre-comment-reply-wrapper:hover {
	color : ${colors.turquoiseBlue} !important;
	text-decoration: none !important;
}

.fyre-comment-divider .fyre-comment-reply-highlight {
	color: ${colors.coreNeutral4} !important;
}

.fyre-comment-divider .fyre-comment-reply-highlight .fyre-comment-reply-count {
	color: ${colors.coreNeutral4} !important;
	padding: 0px !important;
}

.fyre-comment-divider .fyre-comment-reply-highlight:hover {
	color : ${colors.turquoiseBlue} !important;
}

.fyre-hovercard {
	display: none !important;
}

.fyre-outer-comment-container .fyre-comment-head,
.fyre-outer-comment-container .fyre-comment-body {
	margin-left: 60px !important;
}

.fyre-comment-like-btn {
	margin-left: 2px !important;
}

.fyre a.fyre-mobile-action-button,
.fyre a.fyre-comment-action-button,
.fyre a.fyre-delete-link,
.fyre a.fyre-flag-link,
.fyre .fyre-comment-like-count {
	height: auto !important;
	line-height: auto !important;
	padding: 0px !important;
	font-size: 12px !important;
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	font-weight: bold !important;
	background-image: none !important;
	border: 0 !important;
	color: 	${colors.turquoiseBlue} !important;
}

.fyre-comment-wrapper .fyre-comment-like-count {
	color: ${colors.coreLightMinus1} !important;
	margin-right: 3px !important;
}

.fyre-comment-wrapper .fyre-comment-like-imgs {
	top: 0px !important;
	display: none !important;
}

.fyre .fyre-comment-actions a>span {
	background-image: url("https://layout.eurosport.com/i/v8/livefyre/sprite1.png") !important
}

.fyre-editor .fyre-editor-toolbar .fyre-share-button label.fyre-share-counter.fyre-share-empty {
	background-image: none !important;
}

.fyre-editor .fyre-editor-toolbar .fyre-share-container>span>a {
	background-repeat: no-repeat !important;
	-webkit-box-sizing: content-box !important;
	-moz-box-sizing: content-box !important;
	-ms-box-sizing: content-box !important;
	-o-box-sizing: content-box !important;
	box-sizing: content-box !important;
	color: ${colors.coreNeutral4} !important;
	cursor: pointer !important;
	display: block !important;
  font-family: ${fontFamilies.helvetica} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	font-size: 12px !important;
	height: 10px !important;
	line-height: 13px !important;
	padding: 8px 0 8px 28px !important;
	position: relative !important;
	text-transform: capitalize !important;
}

.fyre .fyre-comment a.fyre-comment-edit{
	display: none !important;
}

.fyre .fyre-comment-divider>div.fyre-comment-divider {
	background: ${colors.coreNeutral4} !important;
}

.fyre .fyre-comment-divider>a,
.fyre .fyre-comment-divider>a:hover {
	margin: 0 !important;
	left: 0 !important;
}

.fyre-share-link {
	display: none !important;
}

.fyre-velocity {
	background-color: transparent !important;
	background-image: none !important;
	margin-top: 30px !important;
	border:0px !important;
}

.fyre-velocity::before,
.fyre .fyre-stream-more::before {
  content:'';
  position:absolute;
  display:block;
  height:1px;
  width: 100%;
  background:${colors.coreNeutral4};
	left:50%;
	margin-top: 20px;
  z-index:1;
  transform:translateX(-50%);
  -webkit-transform:translateX(-50%);
}

.fyre-velocity-next,
.fyre .fyre-stream-more .fyre-stream-more-container
 {
	background-color: ${colors.blackPearl} !important;
	background-image: none !important;
	border: 1px solid ${colors.coreNeutral4} !important;
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	border-radius: 2px !important;
	cursor: pointer !important;
	display: inline-block !important;
	line-height: 40px !important;
	overflow: hidden !important;
	padding: 0px 30px !important;
	text-decoration: none !important;
	text-shadow: none !important;
	height: 40px !important;
	position: relative !important;
	z-index:1 !important;
}

.fyre-velocity-next:hover,
.fyre .fyre-stream-more .fyre-stream-more-container:hover {
	border: 1px solid ${colors.coreLightMinus1} !important;
	color: ${colors.coreLightMinus1} !important;
}

.fyre-velocity .fyre-velocity-refresh {
	display: none !important;
}

.fyre-velocity .fyre-velocity-count {
	background-color: transparent !important;
	background-image: none !important;
	border: 0px !important;
	margin: 0px !important;
	width: auto !important;
}

.fyre-velocity .fyre-velocity-count,
.fyre-velocity .fyre-velocity-text {
	font-weight: normal !important;
	color: ${colors.coreNeutral4} !important;
	line-height: 20px !important;
	-webkit-box-shadow: 0px !important;
	-moz-box-shadow: none !important;
	-ms-box-shadow: none !important;
	-o-box-shadow: none !important;
	box-shadow: none !important;
}

.fyre-velocity:hover .fyre-velocity-count,
.fyre-velocity:hover .fyre-velocity-text {
	color: ${colors.coreLightMinus1} !important;
}

.fyre .fyre-stream-more {
	background-image: none !important;
	margin-top: 30px !important;
}

.fyre .fyre-stream-more .fyre-stream-more-container .fyre-text {
	color: ${colors.coreNeutral4} !important;
	line-height: 35px !important;
	font-size: 12px !important;
}

.fyre .fyre-stream-more .fyre-stream-more-container:hover .fyre-text {
	color: ${colors.coreLightMinus1} !important;
}

.fyre .fyre-content-loading { 
		background: none !important;
		padding-left: 0px !important;
    text-indent: -9999px; 
	}

.fyre .fyre-stream-more .fyre-stream-more-container .fyre-spinner,
.fyre .fyre-content-loading {
	margin: 12px auto 0px auto !important;
	text-align: center !important;
	width: 15px !important;
	height: 15px !important;
	border-radius: 50% !important;
	border-top: 1px solid ${colors.dodgerBlue} !important;
	border-right: 1px solid ${colors.dodgerBlue} !important;
	border-bottom: 1px solid ${colors.dodgerBlue} !important;
	animation: round 1s linear infinite !important;
}

@keyframes round {
	0% {
		transform: rotate(0deg);	
	}
	
	50% {
		transform: rotate(180deg);
	}
	
	100% {
		transform: rotate(360deg);
	}
}

.fyre .fyre-stream-more .fyre-stream-more-container .fyre-spinner img {
	display: none !important;
} 

.fyre .fyre-flag-menu-item {
	height: auto !important;
}

.fyre a.fyre-comment-flag-mobile-btn:before {
	top: 2px !important
}

.fyre a.fyre-comment-flag-mobile-btn:after {
	top: -6px !important
}

.fyre-modal-bg {
	position: fixed !important;
	min-height: 100% !important;
	width: 100% !important;
	background: black !important;
	background: rgba(0, 0, 0, 0.5) !important;
	z-index: 98 !important;
	top: 0 !important;
	left: 0 !important
}
.fyre-modal {
	background-color: ${colors.coreNeutral9} !important;
	background-image: none !important;
	padding: 30px !important;
	-webkit-border-radius: 0px !important;
	-moz-border-radius: 0px !important;
	-ms-border-radius: 0px !important;
	-o-border-radius: 0px !important;
	border-radius: 3px !important;
	-webkit-box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.5) !important;
	-moz-box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.5) !important;
	-ms-box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.5) !important;
	-o-box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.5) !important;
	box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.5) !important;
	border: 0px !important;
	outline: none !important
}
.fyre-modal .fyre-modal-container {
	text-align: center !important;
	padding: 0 !important;
	outline: none !important;
	max-width: 600px !important;
	margin: 0 auto !important
}
.fyre-modal .fyre-modal-container:before{
	content: '';
	max-width: 600px !important;
	width: calc(100% - 60px);
	border-top: 1px solid ${colors.coreLightMinus1};
	border-bottom: 1px solid ${colors.coreLightMinus1};
  position: absolute;
	left: 0;
	height: 68px;
	z-index: -1;
	margin: 0px 30px;
}
.fyre-modal-title {
	font-size: 38px !important;
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	color: ${colors.coreLightMinus1} !important;
	background: none !important;
	margin-top: 20px !important;
	margin-bottom: 40px !important;
	text-align: center !important;
	border-bottom: 0px !important;
	outline: none !important;
	height: auto !important;
	min-height: 30px !important;
	max-width: 600px !important
}
.fyre-modal .fyre-modal-title-close {
	display:none !important;
}

.fyre-modal .fyre-modal-subtitle {
	display: none !important;
	color: ${colors.arsenic};
	outline: none !important;
	margin: 40px 0 10px 0 !important
}

.fyre-modal .fyre-modal-container .fyre-modal-flag-form label:first-of-type {
    display: inline-block !important;
    margin: 0 0 30px 0 !important;
    width: 60% !important;
    vertical-align: middle !important;
		text-align: left !important;
		line-height: 68px !important;
		height: 68px !important;
}

.fyre-modal .fyre-modal-textarea.fyre-modal-flagas{	
	height: 70px !important;
}

.fyre-modal-select-error {
	display: none !important;
}
.fyre-modal .fyre-modal-textarea.fyre-modal-flagas,
.fyre-modal .fyre-modal-container .fyre-modal-flag-form label:first-of-type {
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	font-size: 20px !important;
	background-color: transparent !important;
	color: ${colors.coreLightMinus1} !important;
	border: none !important;	
	
}
.fyre-modal .fyre-modal-textfield,
.fyre-modal .fyre-modal-textarea {
	font-size: 16px !important;
	border: 1px solid ${colors.arsenic} !important;
	padding: 0 20px 0 20px !important;
	outline: none !important;
	float: none !important;
	background-color: ${colors.coreLightMinus1} !important;
	color: ${colors.arsenic} !important;
	-webkit-box-shadow: none !important;
	-moz-box-shadow: none !important;
	-ms-box-shadow: none !important;
	-o-box-shadow: none !important;
	box-shadow: none !important;
	border-radius: 2px !important;
}
.fyre-modal .fyre-modal-textfield {
	height: 50px !important;
}
.fyre-modal .fyre-modal-textfield ::-webkit-input-placeholder {
	color: ${colors.coreNeutral4} !important
}
.fyre-modal .fyre-modal-textfield :-moz-placeholder {
	color: ${colors.coreNeutral4} !important
}
.fyre-modal .fyre-modal-textfield ::-moz-placeholder {
	color: ${colors.coreNeutral4} !important
}
.fyre-modal .fyre-modal-textfield :-ms-input-placeholder {
	color: ${colors.coreNeutral4} !important
}
.fyre-modal .fyre-modal-textfield:focus {
	border: 1px solid ${colors.arsenic} !important
}
.fyre-modal .fyre-modal-textarea {
	cursor: pointer !important;
	margin-bottom: 30px !important;
	border-bottom: 1px solid ${colors.arsenic} !important;
	display: inline-block !important;
	vertical-align: middle !important;
	width: 40% !important
}
.fyre-modal .fyre-modal-textfield.fyre-modal-notes {
	height: 100px !important;
	padding-top: 10px !important
}
.fyre-modal .fyre-modal-buttons {
	text-align: left !important;
	height: auto !important;
	outline: none !important;
	width: 100% !important;
	max-width: 600px !important;
	margin: 20px auto 0 !important
}
.fyre-modal .fyre-modal-buttons>button:first-child {
	margin-right: 4% !important
}
.fyre-modal .fyre-modal-buttons>button {
	height: 40px !important;
	border: 1px solid ${colors.coreNeutral4} !important;
	background-color: transparent !important;
	color: ${colors.coreNeutral4} !important;
	font-weight: bold !important;
	text-transform: uppercase !important;
	background-image: none !important;
	font-size: 12px !important;
	font-family: ${fontFamilies.alphaHeadline} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
	border-radius: 2px !important;
	cursor: pointer !important;
	display: inline-block !important;
	padding: 12px 0 !important;
	text-decoration: none !important;
	text-shadow: none !important;
	width: 30% !important;
	-webkit-box-shadow: none !important;
	-moz-box-shadow: none !important;
	-ms-box-shadow: none !important;
	-o-box-shadow: none !important;
	box-shadow: none !important;
}
.fyre-modal .fyre-modal-buttons>button:hover {
	border: 1px solid ${colors.coreLightMinus1} !important;
	color: ${colors.coreLightMinus1} !important;
}
.fyre-modal .fyre-modal-share textarea.fyre-modal-textfield {
	height: 60px !important
}
.fyre-modal .fyre-modal-shares {
	text-align: left !important;
	margin: 40px 0 !important
}
.fyre-modal-shares-permalink {
	display: none !important
}
.fyre-modal .fyre-modal-share .fyre-modal-buttons {
	display: none !important
}
.fyre-modal .fyre-modal-share .fyre-modal-twitter-icon,
.fyre-modal .fyre-modal-facebook-icon {
	margin-left: 10px !important;
	top: -1px !important
}
.fyre-modal .fyre-modal-share .fyre-modal-facebook-icon {
	margin-left: 40px !important
}


@media screen and (min-width: 768px) {
	.fyre-comment-wrapper .fyre-comment p,
	.fyre-comment-wrapper .fyre-comment p a {
		font-size: 16px !important;
	}

	.fyre-auth .fyre-login-bar, .fyre .fyre-auth .fyre-login-bar a {
		font-size: 16px !important;
	}

	.fyre-editor .fyre-editor-container .fyre-editor-editable {
		font-size: 16px !important; 
	}

	.fyre-editor .fyre-editor-toolbar {
		width: auto !important;
	}

	.fyre-stream-content-not-found {
		font-size: 16px !important; 
	}

	.fyre-stream-sort {
		text-align: right !important;
	}

	.fyre-stream-sort .fyre-stream-sort-bar {
		margin: 0 5px !important;
	}

	.fyre-stream-sort .fyre-stream-sort-options a {
		font-size: 16px !important;
	}

	.fyre-comment-wrapper .fyre-comment-username {
		font-size: 16px !important;
	}

	.fyre .fyre-comment-tag.fyre-featured .fyre-featured-text {
		font-size: 14px !important;
	}

	.fyre a.fyre-mobile-action-button, 
	.fyre a.fyre-comment-action-button,
	.fyre a.fyre-delete-link,
	.fyre .fyre-comment-like-count,
	.fyre  a.fyre-flag-link {
		font-size: 14px !important;
	}

	.fyre .fyre-comment-reply {
		margin-left : 40px !important;
	}

	.fyre .fyre-comment-actions a.fyre-flag-link{
		display: block !important;
	}

	.fyre-mention,
	.fyre-mention span{
		font-size: 16px !important;
	  font-family: ${fontFamilies.interUi} !important;
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  font-smooth: auto;
		font-weight: bold !important;
	}

	.fyre .fyre-stream-more .fyre-stream-more-container .fyre-text,
	.fyre-velocity-next {
		font-size: 14px !important;
	}

	.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block.fyre-post-button-new,
	.fyre-editor .fyre-editor-toolbar .goog-toolbar>.goog-inline-block.fyre-post-button-reply {
		padding: 13px 50px !important;
	}
}

@media screen and (min-width: 1366px) {
	.fyre-editor .fyre-editor-container .fyre-editor-editable {
    width: 60% !important;
	}
}
`,
    }}
  />
);

class ActivatedComments extends React.Component {
  static getNetworkConfig(livefyreConfig) {
    const { config, labels } = livefyreConfig;
    return {
      network: config.networkDomain,
      strings: labels,
    };
  }

  static getConvConfig(livefyreConfig) {
    const { config, collection } = livefyreConfig;

    return {
      siteId: config.siteId,
      articleId: collection.articleId,
      el: 'livefyre',
      collectionMeta: collection.collectionMeta,
      checksum: collection.checksum,
    };
  }

  constructor(props) {
    super(props);
    this.auth = null;
    this.state = { count: 0, isWidgetLoaded: false };
  }

  componentDidUpdate(prevProps) {
    const { livefyreConfig } = this.props;
    if (livefyreConfig !== prevProps.livefyreConfig) {
      this.initLivefyre();
    }
  }

  initLivefyre = () => {
    const { livefyreConfig, loginCallback, logoutCallback } = this.props;

    const networkConfig = ActivatedComments.getNetworkConfig(livefyreConfig);
    const convConfig = ActivatedComments.getConvConfig(livefyreConfig);

    window.Livefyre.require(['fyre.conv#3', 'auth'], (Conv, auth) => {
      this.auth = auth;
      /* eslint-disable no-new */
      new Conv(networkConfig, [convConfig], commentsWidget => {
        this.setState({ isWidgetLoaded: true });
        commentsWidget.on('commentCountUpdated', data => {
          this.setState({ count: data });
        });
      });
      this.auth.delegate({
        login() {
          loginCallback();
        },
        logout(cb) {
          cb(null);
          logoutCallback();
        },
        viewProfile() {},
      });
    });
  };

  processAuth = () => {
    const { userToken } = this.props;
    if (this.auth !== null) {
      if (userToken !== '') {
        this.auth.authenticate({ livefyre: userToken });
      } else {
        this.auth.logout();
      }
    }
  };

  render() {
    const { livefyreConfig, rightAdElement } = this.props;
    const { count, isWidgetLoaded } = this.state;

    this.processAuth();

    const comments = isWidgetLoaded ? (
      <StyledContentCss />
    ) : (
      <StyledSpinnerWrapper>
        <StyledSpinner color={colors.dodgerBlue} width="80px" />
      </StyledSpinnerWrapper>
    );

    return (
      <>
        <ScriptInjector isServer={false} src={livefyreConfig.config.scriptUrl} onLoad={this.initLivefyre} />
        <StyledHeader>{count === 0 ? '' : count} comments</StyledHeader>
        <StyledWrapper>
          <StyledComments id="livefyre">{comments}</StyledComments>
          <StyledAdvertisement>{rightAdElement}</StyledAdvertisement>
        </StyledWrapper>
        <StyledFooter href="http://livefyre.fr">Powered by Livefyre</StyledFooter>
      </>
    );
  }
}

ActivatedComments.defaultProps = {
  userToken: '',
  rightAdElement: null,
};

export const ActivatedCommentsPropTypeShape = PropTypes.shape({
  collection: PropTypes.shape({
    articleId: PropTypes.string,
    checksum: PropTypes.string,
    collectionMeta: PropTypes.string,
  }),
  config: PropTypes.shape({
    networkDomain: PropTypes.string,
    scriptUrl: PropTypes.string,
    siteId: PropTypes.number,
  }),
  labels: PropTypes.object,
  areCommentsActivated: PropTypes.bool,
});

ActivatedComments.propTypes = {
  livefyreConfig: ActivatedCommentsPropTypeShape.isRequired,
  loginCallback: PropTypes.func.isRequired,
  logoutCallback: PropTypes.func.isRequired,
  rightAdElement: PropTypes.element,
  userToken: PropTypes.string,
};

export default ActivatedComments;
