#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler


# In[2]:


from sklearn.decomposition import PCA #Principal Component Analysis
#plotly imports
import plotly as py
import plotly.graph_objs as go
from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot


# In[3]:


td = pd.read_excel(r"C:\Users\fadhilmhanif\Documents\WORK\college\TA Bu Luciana\TUP-GENAP-2021.xlsx")
td.head()


# In[4]:


td.dtypes


# In[5]:


td.shape


# In[6]:


td.count()


# In[7]:


print(td.isnull().sum())


# In[8]:


td_drop = td.dropna() 
td_drop.count()


# In[9]:


td_drop.shape


# In[10]:


print(td_drop.isnull().sum())


# In[11]:


td_r = td_drop.rename(columns={"Dik Diakui":"D1", "Lit Diakui":"D2", "Abdimas Diakui":"D3", "Penunjang":"P"})
td_r.head()


# In[17]:


td_x =td_r.iloc[:,7:11] 
td_x.head()


# In[18]:


td_x.info()


# In[19]:


import plotly.express as px
fig = px.scatter_matrix(td_x,
width=1200, height=1600)
fig.show()


# In[20]:


fig1 = plt.figure(figsize=(12,4))
fig1.add_subplot(1,2,2)
plt.boxplot(td_x)
plt.show()


# In[21]:


x_array = np.array(td_x)
print(x_array)


# In[22]:


import seaborn as sns
from sklearn_extra.cluster import KMedoids
kmedoids = KMedoids(n_clusters = 3, random_state=42)
kmedoids.fit(x_array)


# In[23]:


print(kmedoids.cluster_centers_)
td_x["cluster"] = kmedoids.labels_
td_x.head(10)


# In[24]:


print(kmedoids.cluster_centers_)
td_r["cluster"] = kmedoids.labels_
td_r.head(10)


# In[25]:


td_r.tail(30)


# In[26]:


td_rs = td_r.sort_values(['cluster'], ascending = False)
td_rs.head()


# In[27]:


td_rs.tail()


# In[28]:


td_rs[(td_rs.cluster == 0)]


# In[29]:


td_rs[(td_rs.cluster == 1)]


# In[30]:


td_rs[(td_rs.cluster == 2)]


# In[31]:


#PCA with one principal component
pca_1d = PCA(n_components=1)

#PCA with two principal components
pca_2d = PCA(n_components=2)

#PCA with three principal components
pca_3d = PCA(n_components=3)


# In[32]:


#This DataFrame holds that single principal component mentioned above
PCs_1d = pd.DataFrame(pca_1d.fit_transform(td_x.drop(["cluster"], axis=1)))

#This DataFrame contains the two principal components that will be used
#for the 2-D visualization mentioned above
PCs_2d = pd.DataFrame(pca_2d.fit_transform(td_x.drop(["cluster"], axis=1)))

#And this DataFrame contains three principal components that will aid us
#in visualizing our clusters in 3-D
PCs_3d = pd.DataFrame(pca_3d.fit_transform(td_x.drop(["cluster"], axis=1)))


# In[33]:


PCs_1d.columns = ["PC1_1d"]

#"PC1_2d" means: 'The first principal component of the components created for 2-D visualization, by PCA.'
#And "PC2_2d" means: 'The second principal component of the components created for 2-D visualization, by PCA.'
PCs_2d.columns = ["PC1_2d", "PC2_2d"]

PCs_3d.columns = ["PC1_3d", "PC2_3d", "PC3_3d"]


# In[34]:


td_x = pd.concat([td_x,PCs_1d,PCs_2d,PCs_3d], axis=1, join='inner')


# In[35]:


td_x


# In[36]:


#Note that all of the DataFrames below are sub-DataFrames of 'plotX'.
#This is because we intend to plot the values contained within each of these DataFrames.

cluster0 = td_x[td_x["cluster"] == 0]
cluster1 = td_x[td_x["cluster"] == 1]
cluster2 = td_x[td_x["cluster"] == 2]


# In[37]:


#This is needed so we can display plotly plots properly
init_notebook_mode(connected=True)


# In[39]:


#Instructions for building the 2-D plot

#trace1 is for 'Cluster 0'
trace1 = go.Scatter(
                    x = cluster0["PC1_2d"],
                    y = cluster0["PC2_2d"],
                    mode = "markers",
                    name = "Cluster 0",
                    marker = dict(color = 'rgba(255, 128, 255, 0.8)'),
                    text = None)

#trace2 is for 'Cluster 1'
trace2 = go.Scatter(
                    x = cluster1["PC1_2d"],
                    y = cluster1["PC2_2d"],
                    mode = "markers",
                    name = "Cluster 1",
                    marker = dict(color = 'rgba(255, 128, 2, 0.8)'),
                    text = None)

#trace3 is for 'Cluster 2'
trace3 = go.Scatter(
                    x = cluster2["PC1_2d"],
                    y = cluster2["PC2_2d"],
                    mode = "markers",
                    name = "Cluster 2",
                    marker = dict(color = 'rgba(0, 255, 200, 0.8)'),
                    text = None)

data = [trace1, trace2, trace3]

title = "Visualizing Clusters in Two Dimensions Using PCA"

layout = dict(title = title,
              xaxis= dict(title= 'PC1',ticklen= 5,zeroline= False),
              yaxis= dict(title= 'PC2',ticklen= 5,zeroline= False)
             )

fig = dict(data = data, layout = layout)

iplot(fig)


# In[38]:


td_r.to_csv('hasil clustering.csv', index= False)


# In[ ]:




