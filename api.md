---
description: Official Myrealms backend first build.
---

# Getting Started



#### CONFIGURATION

PORT by default : 8000 

Base URL : http://localhost:8000

### ENDPOINT REFERENCE

<table>
  <thead>
    <tr>
      <th style="text-align:left">Endpoint</th>
      <th style="text-align:left">Method</th>
      <th style="text-align:left">Request</th>
      <th style="text-align:left">Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>status: &quot;online&quot;,</p>
        <p>host: &quot;localhost:8000&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/user/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;user&quot; : {</p>
        <p>&quot;email&quot; : &quot;a@mail.com&quot;,</p>
        <p>&quot;password&quot; : &quot;12345&quot;,</p>
        <p>&quot;username&quot; : &quot;abcd&quot;</p>
        <p>}</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;user&quot;: {</p>
        <p>&quot;_id&quot;: &quot;12ab&quot;,</p>
        <p>&quot;email&quot;: &quot;a@mail.com&quot;,</p>
        <p>&quot;username&quot;: &quot;abcd&quot;,</p>
        <p>&quot;token&quot;: &quot;xyz&quot;</p>
        <p>}</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/user/login/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;user&quot; : {</p>
        <p>&quot;email&quot; : &quot;a@mail.com&quot;,</p>
        <p>&quot;password&quot; : &quot;12345&quot;</p>
        <p>}</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;user&quot;: {</p>
        <p>&quot;_id&quot;: &quot;12ab&quot;,</p>
        <p>&quot;email&quot;: &quot;a@mail.com&quot;,</p>
        <p>&quot;username&quot;: &quot;abcd&quot;,</p>
        <p>&quot;token&quot;: &quot;xyz&quot;</p>
        <p>}</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/user/current/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;user&quot;: {</p>
        <p>&quot;_id&quot;: &quot;12ab&quot;,</p>
        <p>&quot;email&quot;: &quot;a@mail.com&quot;,</p>
        <p>&quot;username&quot;: &quot;abcd&quot;,</p>
        <p>&quot;token&quot;: &quot;xyz&quot;</p>
        <p>}</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/img/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>File upload with &quot;image&quot; as key</p>
        <p>in form data of body.</p>
        <p>(* Only jpeg/png formats)</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;imageUrl&quot; : &quot;awss3url&quot;,</p>
        <p>&quot;imageName&quot; : &quot;abc&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/art/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>[</p>
        <p>{</p>
        <p>&quot;_id&quot;: &quot;5f9000a51f11cf5852292829&quot;,</p>
        <p>&quot;user&quot;: &quot;5f8ffb5c1f11cf5852292828&quot;,</p>
        <p>&quot;description&quot;: &quot;abc&quot;,</p>
        <p>&quot;title&quot;: &quot;abc&quot;,</p>
        <p>&quot;time&quot;: &quot;2020-10-21T09:34:29.892Z&quot;,</p>
        <p>&quot;img&quot;: &quot;awss3url&quot;,</p>
        <p>&quot;likes&quot;: [],</p>
        <p>&quot;comments&quot;: [],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
        <p>]</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/art/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;description&quot;: &quot;abc&quot;,</p>
        <p>&quot;title&quot;: &quot;abc&quot;,</p>
        <p>&quot;img&quot;: &quot;awss3url&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;5f9000a51f11cf5852292829&quot;,</p>
        <p>&quot;user&quot;: &quot;5f8ffb5c1f11cf5852292828&quot;,</p>
        <p>&quot;description&quot;: &quot;abc&quot;,</p>
        <p>&quot;title&quot;: &quot;abc&quot;,</p>
        <p>&quot;time&quot;: &quot;2020-10-21T09:34:29.892Z&quot;,</p>
        <p>&quot;img&quot;: &quot;awss3url&quot;,</p>
        <p>&quot;likes&quot;: [],</p>
        <p>&quot;comments&quot;: [],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
  </tbody>
</table>

