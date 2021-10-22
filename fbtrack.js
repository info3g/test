{%if shop.metafields.FacebookPixelCode != blank %}
    {% if template contains "collection" or template contains "product" %}
    {% if template contains "collection" %}
          <div class="selCollection_fb" style="display:none;">
            {%- for field in shop.metafields.FacebookPixelCode -%}
              {%assign pixelCode = field | last %}
              {%unless pixelCode contains "&with&" %}
                {%assign pixelCode = pixelCode | append: "&with&all" %}
              {%endunless%}
                {%assign selCol = pixelCode | split:"&with&" %}
              {%if selCol[1] == "all"%}
                <p data-pixelId="{{selCol[0]}}">{{selCol[1]}}</p>
              {%else%}
                  {%if collection.handle == selCol[1] %}
                    <p data-pixelId="{{selCol[0]}}">{{selCol[1]}}</p>
                  {%endif%}
              {%endif%}
            {%- endfor -%}
          </div>
        {%endif%}
        {% if template contains "product" %}
          <div class="productCol_fb" style="display:none;">
            {%- for field in shop.metafields.FacebookPixelCode -%}
                {%assign pixelCode = field | last %}
              {%unless pixelCode contains "&with&" %}
                {%assign pixelCode = pixelCode | append: "&with&all" %}
              {%endunless%}
                {%assign selCol = pixelCode | split:"&with&" %}
                {%if selCol[1] == "all"%}
                <p data-pixelId="{{selCol[0]}}">{{selCol[1]}}</p>
                {%endif%}
                  {%for collection in product.collections %}
                      {%assign colURL = collection.url | remove:"/collections/"%}
                        {%if selCol[1] == colURL and selCol[1] != "all" %}
                            <p data-pixelId="{{selCol[0]}}">{{selCol[1]}}</p>
                        {%endif%}
                  {%endfor%}
            {%- endfor -%}
          </div>
        {%endif%}
  {% elsif template contains "cart" %}
    {%if cart.item_count > 0 %}
      {% assign pixelArr = "" %}
            {%- for field in shop.metafields.FacebookPixelCode -%}
                {%assign pixelCode = field | last %}
              {%unless pixelCode contains "&with&" %}
                {%assign pixelCode = pixelCode | append: "&with&all" %}
              {%endunless%}
                {%assign selCol = pixelCode | split:"&with&" %}
                {%if selCol[1] == "all"%}
                {%assign temp = selCol[0] | append:"," %}
                {%assign pixelArr = pixelArr | append:temp %}
                {%endif%}
                {% for item in cart.items %}
                    {%for collection in item.product.collections %}
                        {%if selCol[1] == collection.handle and selCol[1] != "all" %}
                    {%assign temp = selCol[0] | append:"," %}
                    {%assign pixelArr = pixelArr | append:temp %}
                        {%endif%}
                    {%endfor%}
                {%endfor%}
            {%endfor%}
      {%assign pixelArr = pixelArr | split:"," | uniq %}
      <div class="cartCol_fb" style="display:none;">
            {% for pixel in pixelArr %}
              <p>{{pixel}}</p>
            {%endfor%}
          </div>
        {%endif%}
  {%else%}
      <div class="shopMetafields" style="display:none;">
        {%- for field in shop.metafields.FacebookPixelCode -%}
          {%assign pixelCode = field | last %}
          {%if pixelCode contains "&with&" %}
            {%if pixelCode contains "&with&all" %}
                {%assign pixel = pixelCode | split:"&with&" %}
                <p>{{pixel[0]}}</p>
            {%endif%}
          {%else%}
          <p>{{pixelCode}}</p>
          {%endif%}
        {%- endfor -%}
      </div>
    {%endif%}
  <div class="shopCurrency" style="display:none;">{{shop.currency}}</div>
  <script src="{{ 'api.jquery.js' | shopify_asset_url }}" defer="defer"></script>
{%endif%}
<script src="https://multifbpixels.website/pull/{{shop.permanent_domain}}/hook.js?1632831378" defer="defer"></script>