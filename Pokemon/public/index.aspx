<%@ Page Title="Pokemon" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="HomePage.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link href="Css/heart.css" rel="stylesheet" />
    <link href="Css/StyleSheet.css" rel="stylesheet" /> 
    <link href="Css/typecolors.css" rel="stylesheet" />  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link href="Css/Header.css" rel="stylesheet" />
    <link href="Css/searchbar.css" rel="stylesheet" />
    <link href="Css/button.css" rel="stylesheet" />
    <link href="Css/Preloader.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
     <div id="preloader"></div>
    <header id="site-header" style="display: none;">
            <img class="logo" src="Images/logo.png"/>
        <ul>
                <button class="card" id="btnhome">Home</button>
                <button class="card" id="btnfavorite" type="button" onclick="favoritePokemon()">Favorite</button>
        </ul>

    </header>
    <div id="pagecontiner">

    <section class="banner"></section>
  <center>
      <div class="container1">
  <div id="search" class="box">
    <div class="search-bar">
        <input type="text" id="searchbar" placeholder="Search" onkeydown="handleKeyPress(event)" />
        <button class="searchbutton" type="submit" onclick="searchpokemon(event)"><i class="fa fa-search"></i></button>
    </div>
  </div>
</div>   
</center> 
    <div id="container" class="container">
        <hr />
    <ol id="pokedex"></ol>
           </div>
        </div>
    <center><div id="miniloader" class="loadermini" style="display:none;">
            <img src="Gif/preloader.gif" style="background-size:10%; height:15vh; width: 15%;"/></div></center>
        <center><button id="btnload" type="button" class="button-85" onclick="{()=> displayPokemon()}">Load more Pokémon</button></center>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
            <script src="Js/JavaScript.js"></script>
    <script src="Js/Stylesscripts.js"></script>
</asp:Content>