---
description: Myrealms backend first build.
---

# API DOC



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
        <p>&quot;email&quot; : &quot;String&quot;,</p>
        <p>&quot;password&quot; : &quot;String&quot;,</p>
        <p>&quot;username&quot; : &quot;String&quot;</p>
        <p>}</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;user&quot;: {</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;email&quot;: &quot;String&quot;,</p>
        <p>&quot;username&quot;: &quot;String&quot;,</p>
        <p>&quot;token&quot;: &quot;String(hash)&quot;</p>
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
        <p>&quot;email&quot; : &quot;String&quot;,</p>
        <p>&quot;password&quot; : &quot;String&quot;</p>
        <p>}</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;user&quot;: {</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;email&quot;: &quot;String&quot;,</p>
        <p>&quot;username&quot;: &quot;String&quot;,</p>
        <p>&quot;token&quot;: &quot;String(hash)&quot;</p>
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
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;email&quot;: &quot;String&quot;,</p>
        <p>&quot;username&quot;: &quot;String&quot;,</p>
        <p>&quot;token&quot;: &quot;String(hash)&quot;</p>
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
        <p>&quot;imageUrl&quot; : &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;imageName&quot; : &quot;String(Filename)&quot;</p>
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
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
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
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/art/:id/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/art/:id/</td>
      <td style="text-align:left">PUT</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/art/:id/</td>
      <td style="text-align:left">DELETE</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;Post Removed&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/art/like/:id/</td>
      <td style="text-align:left">PUT</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;post liked&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/art/unlike/:id/</td>
      <td style="text-align:left">PUT</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;post unliked&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/art/comment/:id/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;text&quot;: &quot;String&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>[</p>
        <p>*Updated list of comments*</p>
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;text&quot;: &quot;String&quot;,</p>
        <p>&quot;name&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;</p>
        <p>}</p>
        <p>]</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/art/comment/:id/:comment_id/</td>
      <td style="text-align:left">DELETE</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;comment deleted&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/click/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>[</p>
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
        <p>]</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/click/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/click/:id/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/click/:id/</td>
      <td style="text-align:left">PUT</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/click/:id/</td>
      <td style="text-align:left">DELETE</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;Post Removed&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/click/like/:id/</td>
      <td style="text-align:left">PUT</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;post liked&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/click/unlike/:id/</td>
      <td style="text-align:left">PUT</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;post unliked&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/click/comment/:id/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;text&quot;: &quot;String&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>[</p>
        <p>*Updated list of comments*</p>
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;text&quot;: &quot;String&quot;,</p>
        <p>&quot;name&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;</p>
        <p>}</p>
        <p>]</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/click/comment/:id/:comment_id/</td>
      <td style="text-align:left">DELETE</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;comment deleted&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/write/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>[</p>
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
        <p>]</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/write/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/write/:id/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/write/:id/</td>
      <td style="text-align:left">PUT</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;,</p>
        <p>&quot;description&quot;: &quot;String&quot;,</p>
        <p>&quot;title&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;img&quot;: &quot;String(URL_of_S3)&quot;,</p>
        <p>&quot;likes&quot;: [*List of Likes*],</p>
        <p>&quot;comments&quot;: [*List of Comments*],</p>
        <p>&quot;__v&quot;: 0</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/write/:id/</td>
      <td style="text-align:left">DELETE</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;Post Removed&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/write/like/:id/</td>
      <td style="text-align:left">PUT</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;post liked&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/write/unlike/:id/</td>
      <td style="text-align:left">PUT</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;post unliked&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/write/comment/:id/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;text&quot;: &quot;String&quot;</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>[</p>
        <p>*Updated list of comments*</p>
        <p>{</p>
        <p>&quot;_id&quot;: &quot;String&quot;,</p>
        <p>&quot;time&quot;: &quot;Datetime&quot;,</p>
        <p>&quot;text&quot;: &quot;String&quot;,</p>
        <p>&quot;name&quot;: &quot;String&quot;,</p>
        <p>&quot;user&quot;: &quot;String&quot;</p>
        <p>}</p>
        <p>]</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/write/comment/:id/:comment_id/</td>
      <td style="text-align:left">DELETE</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>&quot;msg&quot;: &quot;comment deleted&quot;</p>
        <p>}</p>
      </td>
    </tr>
  </tbody>
</table>

